'use client';

import Link from 'next/link';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import { useRef } from 'react';

export default function MobileNav() {
  const reserveRef = useRef(null);
  addScrollingClass(reserveRef, 500);

  return (
    <div ref={reserveRef} className="reserve-action-floating hidden sticky inset-x-0 bottom-0 z-50 h-16 w-full grid-cols-1 items-center justify-center gap-2 bg-black shadow-menu-shadow md:hidden">
      <div className="flex items-center justify-center">
        <Link href='#book' className="w-full h-full text-center text-white text-xl inline-block">
          Book Now
        </Link>
      </div>
    </div>
  );
}
