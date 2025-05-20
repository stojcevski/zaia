'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function BookingsPage() {
    return (
        <ClerkProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <SignedIn>
                    <h1 className="text-2xl font-bold mb-4">Bookings Table</h1>
                    <div className="w-full mt-4">
                        {/* Bookings table goes here */}
                        <p>Here will be the bookings table.</p>
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
