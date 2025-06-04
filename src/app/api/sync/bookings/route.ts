// pages/api/sync-airbnb.ts
import { fetchAllIcalBookings, icalUrls } from '@/utils/iCals';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST() {
  try {
    const bookings = await fetchAllIcalBookings(icalUrls);

    const mappedBookings = bookings.map((b) => {
      let booking: {
        type?: string;
        source?: string;
        checkin?: string;
        checkout?: string;
        listing?: string;
        uid?: string;
      } = {};

      if (b.source === 'airbnb') {
        booking.type = b.summary === 'Reserved' ? 'reservation' : 'manually_closed';
      }
      if (b.source === 'booking') {
        booking.type = b.summary === 'CLOSED - Not available' ? 'manually_closed' : 'reservation';
      }
      booking.source = b.source;
      const startDate = new Date(b.start);
      startDate.setDate(startDate.getDate() - 1);
      booking.checkin = format(startDate, 'yyyy-MM-dd');
      const endDate = new Date(b.end);
      endDate.setDate(endDate.getDate() - 1);
      booking.checkout = format(endDate, 'yyyy-MM-dd');
      booking.listing = b.listing;
      booking.uid = b.uid;

      return booking;
    });

    // Save mappedBookings to DB
    for (const booking of mappedBookings) {
      // Check if booking with same uid exists
      const { rows } = await pool.query(
        `SELECT checkin, checkout FROM bookings WHERE uid = $1 AND listing = $2`,
        [booking.uid, booking.listing]
      );
      if (rows.length === 0) {
        // Insert new booking
        await pool.query(
          `INSERT INTO bookings (uid, type, source, checkin, checkout, listing, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
          [
            booking.uid,
            booking.type,
            booking.source,
            booking.checkin,
            booking.checkout,
            booking.listing,
          ]
        );
      } else {
        // Exists: check if checkin or checkout changed
        const dbCheckin = format(new Date(rows[0].checkin), 'yyyy-MM-dd');
        const dbCheckout = format(new Date(rows[0].checkout), 'yyyy-MM-dd');
        if (dbCheckin !== booking.checkin || dbCheckout !== booking.checkout) {
          // Update dates and timestamp
          await pool.query(
            `UPDATE bookings
             SET checkin = $1, checkout = $2, updated_at = NOW()
             WHERE uid = $3`,
            [booking.checkin, booking.checkout, booking.uid]
          );
        }
        // else: do nothing (ignore)
      }
    }

    return NextResponse.json({ success: true, data: mappedBookings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Failed to sync' });
  }
}
