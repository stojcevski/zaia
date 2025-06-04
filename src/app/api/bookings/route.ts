import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { format } from 'date-fns';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT uid, listing, checkin, checkout, type, source FROM bookings`
    );

    // Map bookings to expected format and format dates as YYYY-MM-DD
    const mappedBookings = rows.map((b: any) => ({
      listing: b.listing,
      checkin: b.checkin ? format(new Date(b.checkin), 'yyyy-MM-dd') : null,
      checkout: b.checkout ? format(new Date(b.checkout), 'yyyy-MM-dd') : null,
      type: b.type,
      source: b.source,
      uid: b.uid,
    }));

    return NextResponse.json({ mappedBookings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
