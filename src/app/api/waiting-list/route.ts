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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to save waiting list entry' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const result = await pool.query(
            `SELECT id, email, checkin, checkout, people, listing, created_at FROM waiting_list ORDER BY created_at ASC`
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to fetch waiting list entries' }, { status: 500 });
    }
}