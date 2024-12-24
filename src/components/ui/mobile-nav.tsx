'use client';

import Link from 'next/link';

export default function MobileNav() {
  return (
    <div className="sticky inset-x-0 bottom-0 z-50 grid h-16 w-full grid-cols-1 items-center justify-center gap-2 bg-black shadow-menu-shadow md:hidden">
      <div className="flex items-center justify-center">
        <Link href='#book' className="w-full h-full text-center text-white text-xl inline-block">
          Book Now
        </Link>
      </div>
    </div>
  );
}
