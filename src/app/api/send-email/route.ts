import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email, people, departureDate, returnDate, listing } = await req.json();

        if (!email || !people || !departureDate || !returnDate) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const listingText = listing ? `Listing: ${listing}\n` : '';
        const listingHtml = listing ? `<p><strong>Listing:</strong> ${listing}</p>` : '';

        const mailOptions = {
            from: `"Zaia Booking" <${process.env.GMAIL_USER}>`,
            to: process.env.RECIPIENTS,
            replyTo: email,
            subject: `Zaia Booking Inquiry from ${email}`,
            text: `New booking inquiry:

${listingText}Email: ${email}
Number of people: ${people}
Check-in: ${departureDate}
Check-out: ${returnDate}
`,
            html: `
                <h2>New Booking Inquiry</h2>
                ${listingHtml}
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Number of people:</strong> ${people}</p>
                <p><strong>Check-in:</strong> ${departureDate}</p>
                <p><strong>Check-out:</strong> ${returnDate}</p>
            `,
            headers: {
                'X-Mailer': 'Zaia Booking System',
            },
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
