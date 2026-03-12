// Rename this file to /Users/Sasho_1/Sites/zaia/src/app/api/waiting-list/route.ts
// and update your frontend to POST to /api/waiting-list instead of /api/pre-booking

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Set your Neon Postgres URL in .env
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { email, checkin, checkout, people, listing } = data;

        // Check for overlapping bookings
        let available = true;
        let suggestedListing: string | null = null;

        // Helper: check overlap for a given listing
        const isListingAvailable = async (listingToCheck: string) => {
            const overlapResult = await pool.query(
                `SELECT id FROM bookings
                 WHERE listing = $1
                 AND NOT (checkout < $2 OR checkin > $3)`,
                [listingToCheck, checkin, checkout]
            );
            return overlapResult.rowCount === 0;
        };

        if (listing) {
            // Check if the requested listing is available
            available = await isListingAvailable(listing);

            if (!available) {
                // Find another available listing
                const listingsResult = await pool.query(
                    `SELECT DISTINCT listing FROM bookings ORDER BY listing ASC`
                );
                const allListings = listingsResult.rows.map((row: any) => row.listing);

                for (const l of allListings) {
                    if (l === listing) continue;
                    if (await isListingAvailable(l)) {
                        suggestedListing = l;
                        break;
                    }
                }
            }
        } else {
            // No specific listing: check if any listing is available
            const listingsResult = await pool.query(
                `SELECT DISTINCT listing FROM bookings ORDER BY listing ASC`
            );
            const allListings = listingsResult.rows.map((row: any) => row.listing);

            available = false;
            for (const l of allListings) {
                if (await isListingAvailable(l)) {
                    available = true;
                    suggestedListing = l;
                    break;
                }
            }
        }

        // If not available, return response before inserting
        if (!available) {
            return NextResponse.json({
                success: false,
                available: false,
                suggestedListing,
                message: listing
                    ? suggestedListing
                        ? `Listing ${listing} is not available, but ${suggestedListing} is available.`
                        : `Listing ${listing} is not available and no alternatives found.`
                    : 'No available listings for the selected dates.',
            });
        }

        await pool.query(
            `INSERT INTO waiting_list (email, checkin, checkout, people, listing)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                email || null,
                checkin || null,
                checkout || null,
                people !== undefined ? people : null,
                listing || null,
            ]
        );

        return NextResponse.json({ success: true, available: true, suggestedListing: null });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to save waiting list entry' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const result = await pool.query(
            `SELECT id, email, checkin, checkout, people, listing, created_at FROM waiting_list ORDER BY created_at DESC`
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to fetch waiting list entries' }, { status: 500 });
    }
}