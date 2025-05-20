"use client";

import { useEffect, useState } from 'react';

function WaitingListTable() {
    const [waitingList, setWaitingList] = useState([]);

    useEffect(() => {
        fetch('/api/waiting-list')
            .then((res) => res.json())
            .then((data) => setWaitingList(data));
    }, []);

    function formatDate(dateStr: string) {
        const d = new Date(dateStr);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    }

    function getNights(checkin: string, checkout: string) {
        const inDate = new Date(checkin);
        const outDate = new Date(checkout);
        const diff = outDate.getTime() - inDate.getTime();
        return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded-xl shadow border-0">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-left font-semibold">Created At</th>
                        <th className="px-4 py-3 text-left font-semibold">Checkin Date</th>
                        <th className="px-4 py-3 text-left font-semibold">Checkout Date</th>
                        <th className="px-4 py-3 text-left font-semibold">Nights</th>
                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                        <th className="px-4 py-3 text-left font-semibold">People</th>
                        <th className="px-4 py-3 text-left font-semibold">Listing</th>
                    </tr>
                </thead>
                <tbody>
                    {waitingList.map((booking: any, idx: number) => (
                        <tr
                            key={booking.id}
                            className={`hover:bg-gray-50 transition ${
                                idx === waitingList.length - 1 ? '' : 'border-b'
                            }`}
                        >
                            <td className="px-4 py-3">{formatDate(booking.created_at)}</td>
                            <td className="px-4 py-3">{formatDate(booking.checkin)}</td>
                            <td className="px-4 py-3">{formatDate(booking.checkout)}</td>
                            <td className="px-4 py-3">{getNights(booking.checkin, booking.checkout)}</td>
                            <td className="px-4 py-3">{booking.email}</td>
                            <td className="px-4 py-3">{booking.people}</td>
                            <td className="px-4 py-3">{booking.listing}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function WaitingListPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Waiting List</h1>
            <div className="w-full mt-4">
                <WaitingListTable />
            </div>
        </>
    );
}
