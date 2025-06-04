import ical from 'node-ical';

export const icalUrls = [
    {
        url: 'https://www.airbnb.com/calendar/ical/1185431241269089444.ics?s=1d9bbd22f7ad53f8ed8659168c08b7af&locale=el',
        listing: 'N1',
        source: 'airbnb',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1116614553349674394.ics?s=8d3e2b34a16806558a798ffb94df0d0f&locale=el',
        listing: 'N2',
        source: 'airbnb',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1116644538037937993.ics?s=d568aebc4d12c1b3338214869c621269&locale=el',
        listing: 'N3',
        source: 'airbnb',
    },
    {
        url: 'https://ical.booking.com/v1/export?t=b78345a7-b01b-45ce-8942-5ce1dc4eee85',
        listing: 'N3',
        source: 'booking',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1022215396986330198.ics?s=d11fe2c80a9c5ce0e757e8350366c2b3&locale=el',
        listing: 'N4',
        source: 'airbnb',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1015726466185335194.ics?s=792aa1300fbd78c1e683a8279c21484a&locale=el',
        listing: 'N5',
        source: 'airbnb',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1025131758456612362.ics?s=c4407640b5027e63f7a9af1b5cbf3f56&locale=el',
        listing: 'N6',
        source: 'airbnb',
    },
    {
        url: 'https://ical.booking.com/v1/export?t=66b0054a-abe2-4bcb-b119-6cdd6bb38879',
        listing: 'N6',
        source: 'booking',
    },
    {
        url: 'https://www.airbnb.com/calendar/ical/1022488531210377852.ics?s=2338cfcb714bda035fe59b020dc26466&locale=el',
        listing: 'N7',
        source: 'airbnb',
    },
];


type Booking = {
    uid: string;
    summary: string;
    start: Date;
    end: Date;
    listing: string;
    source: string;
};

export async function fetchAllIcalBookings(urls: { url: string; listing: string; source: string; }[]): Promise<Booking[]> {
    const allBookings: Booking[] = [];

    for (const { url, listing, source } of urls) {
        try {
            const events = await ical.async.fromURL(url);

            for (const k in events) {
                const ev = events[k];
                if (ev.type === 'VEVENT') {
                    allBookings.push({
                        uid: ev.uid,
                        summary: ev.summary,
                        start: ev.start,
                        end: ev.end,
                        listing,
                        source
                    });
                }
            }
        } catch (err) {
            console.error(`Failed to fetch ${listing}:`, err);
        }
    }

    return allBookings;
}