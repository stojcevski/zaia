'use client';

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';

export function AdminHeader() {
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white text-stone-900 rounded-xl ">
            <span className="flex items-center font-bold text-lg">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl md:h-12 md:w-12 flex">
                        <Image
                          src={'/images/zaia.ico'}
                          alt="icon"
                          fill
                          sizes="(min-width: 320) 100vw, 100vw"
                          className="aspect-[1/1] rounded-xl object-cover"
                        />
                        <div className='aspect-[1/1] rounded-full bg-stone-400'></div>
                      </div>
            </span>
            <div>
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    );
}

export function AdminSideMenu() {
    const pathname = usePathname();
    return (
        <NavigationMenu.Root
            orientation="vertical"
            className="flex flex-col w-56 min-h-full  border-r border-white py-8 px-4 rounded-xl  my-"
        >
            <NavigationMenu.List className="flex flex-col gap-2">
                <NavigationMenu.Item>
                    <a
                        href="/admin"
                        className={`block px-4 py-2 rounded font-medium text-gray-900 ${
                            pathname === '/admin'
                                ? 'bg-stone-200 font-bold'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Dashboard
                    </a>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <a
                        href="/admin/waiting-list"
                        className={`block px-4 py-2 rounded font-medium text-gray-900 ${
                            pathname === '/admin/waiting-list'
                                ? 'bg-stone-200 font-bold'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Waiting List
                    </a>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <a
                        href="/admin/bookings"
                        className={`block px-4 py-2 rounded font-medium text-gray-900 ${
                            pathname === '/admin/bookings'
                                ? 'bg-stone-200 font-bold'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Bookings
                    </a>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    );
}

export default function AdminPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Admin Platform</h1>
            <p>Zaia Suites & Living</p>
        </>
    );
}
