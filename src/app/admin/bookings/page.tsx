'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import ActivityCalendar from 'react-activity-calendar';

function SuiteActivityCalendar({
    suite,
    bookings,
    loading,
}: {
    suite: string;
    bookings: any[];
    loading?: boolean;
}) {
    // Filter bookings for this suite
    const suiteBookings = bookings.filter(b => b.listing === suite);

    // Prevent rendering if no bookings for this suite and not loading
    if (!loading && suiteBookings.length === 0) return null;

    // Build dateCounts for activity calendar
    const dateCounts: Record<string, { count: number; maxLevel: number }> = {};
    suiteBookings.forEach((b) => {
        const start = new Date(b.checkin + 'T00:00:00Z');
        const end = new Date(b.checkout + 'T00:00:00Z');
        const level = b.type === 'manually_closed' ? 4 : b.type === 'reservation' ? 3 : 0;
        for (
            let d = new Date(start);
            d <= end;
            d.setDate(d.getDate() + 1)
        ) {
            const dateStr = d.toISOString().slice(0, 10);
            if (!dateCounts[dateStr]) {
                dateCounts[dateStr] = { count: 0, maxLevel: 0 };
            }
            dateCounts[dateStr].count += 1;
            // Always keep the highest level for the day
            if (level > dateCounts[dateStr].maxLevel) {
                dateCounts[dateStr].maxLevel = level;
            }
        }
    });

    const activityData = Object.entries(dateCounts).map(([date, { count, maxLevel }]) => ({
        date,
        count,
        level: count === 0 ? 0 : (maxLevel === 3 ? (count == 1 ? 1 : 3) : count == 1 ? 2 : 4),
    }));


    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const [hoveredDateCount, setHoveredDateCount] = useState<number | null>(null);
    const [hoveredDateBookingType, setHoveredDateBookingType] = useState<string | null>(null);

    return (
        <div className="max-w-[77rem] mb-8 bg-stone-200 py-4 pl-6 rounded-xl flex flex-col gap-0">
            <div className='flex gap-8 items-center'>
                <h2 className="text-xl opacity-30 py-1">Zaia Suite {suite}</h2>
                {hoveredDate && <div className='px-4 py-2 font-semibold rounded-md bg-stone-500 text-stone-100 text-sm'>{`${hoveredDateCount} booking${hoveredDateCount && hoveredDateCount == 1 ? '' : 's'} for ${format(hoveredDate, 'dd.MM.yyyy')} ${hoveredDateCount ? ' - '+hoveredDateBookingType : ''}`}</div>}
            </div>
            <div className="rounded p-8 flex overflow-x-scroll min-h-[120px] items-center">
                
                    <ActivityCalendar
                        data={activityData}
                        blockSize={18}
                        blockRadius={3}
                        blockMargin={4}
                        theme={{ light: ['white', 'seagreen', 'tan', 'darkolivegreen', 'sienna'], }}
                        weekStart={1}
                        loading={loading}
                        showWeekdayLabels={['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']}
                        fontSize={12}
                        colorScheme='light'
                        hideColorLegend
                        labels={{
                            totalCount: '{{count}} nights booked in {{year}}',
                            weekdays: [
                                'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
                            ],
                        }}
                        eventHandlers={{
                            onMouseEnter: event => activity => {
                                setHoveredDate(activity.date);
                                setHoveredDateCount(activity.count);
                                setHoveredDateBookingType(activity.level === 4 || activity.level === 2 ? 'manually closed' : (activity.level === 3 || activity.level === 1) ? 'reservation' : '');
                            },
                            onMouseLeave: event => () => {
                                setHoveredDate(null);
                                setHoveredDateCount(null);
                                setHoveredDateBookingType(null);
                            },
                        }}
                    />
            </div>
        </div>
    );
}

export default function BookingsPage() {
    const [syncing, setSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState<string | null>(null);
    const [calendarData, setCalendarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch bookings from DB on mount
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/bookings', { method: 'GET' });
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();
                setCalendarData(Array.isArray(data.mappedBookings) ? data.mappedBookings : []);
            } catch (err) {
                setCalendarData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        setSyncMessage(null);
        setLoading(true);
        try {
            const res = await fetch('/api/sync/bookings', { method: 'POST' });
            if (!res.ok) throw new Error('Sync failed');
            const data = await res.json();

            console.log('Sync response:', data);
            setSyncMessage(data.message || 'Sync successful!');
            setCalendarData(data.data || []);
        } catch (err) {
            setSyncMessage('Sync failed. Please try again.');
            setCalendarData(null);
        } finally {
            setSyncing(false);
            setLoading(false);
        }
    };

    return (
        <ClerkProvider>
            <div className="flex flex-col bg-gray-50">
                <SignedIn>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Bookings</h1>
                        <button
                            onClick={handleSync}
                            disabled={syncing}
                            className="px-4 py-2 rounded bg-stone-900 text-white font-semibold hover:bg-stone-800 disabled:opacity-60"
                        >
                            {syncing ? 'Syncing...' : 'Sync Bookings'}
                        </button>
                    </div>
                    {syncMessage && (
                        <div className="mb-4 text-sm text-stone-700">{syncMessage}</div>
                    )}
                    <div className=" mt-4">
                        {loading ? (
                            // Show loading for all suites (or a placeholder)
                            <SuiteActivityCalendar suite="..." bookings={[]} loading={true} />
                        ) : calendarData && Array.isArray(calendarData) && calendarData.length > 0
                            ? (() => {
                                const allBookings = calendarData;
                                const suites = Array.from(new Set(allBookings.map((b: any) => b.listing)));
                                const suiteCalendars = suites
                                    .map((suite) => {
                                        const suiteBookings = allBookings.filter((b: any) => b.listing === suite);
                                        if (suiteBookings.length === 0) return null;
                                        return (
                                            <SuiteActivityCalendar
                                                key={suite}
                                                suite={suite}
                                                bookings={allBookings}
                                                loading={syncing}
                                            />
                                        );
                                    })
                                    
                                return suiteCalendars.length > 0
                                    ? suiteCalendars
                                    : <p>No bookings available for any suite.</p>;
                            })()
                            : <p>No data synced currently.</p>
                        }
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-2">Zaia Suites & Living</h2>
                        <p className="mb-4 text-gray-600">Welcome to Zaia Suites & Living Platform.</p>
                        <SignInButton mode="modal" />
                    </div>
                </SignedOut>
            </div>
        </ClerkProvider>
    );
}
