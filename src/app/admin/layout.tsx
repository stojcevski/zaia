'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AdminHeader, AdminSideMenu } from './page';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            publishableKey={process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_DEV}
        >
            <div className="min-h-screen flex flex-col justify-center bg-gray-50">
                <SignedIn>
                    <AdminHeader />
                    <div className="flex flex-1 w-full">
                        <AdminSideMenu />
                        <main className="flex-1 flex flex-col p-8 w-full">
                            {children}
                        </main>
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
