'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Routes } from '@/config/routes';
import Image from 'next/image';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
    <Link
      href={Routes.public.home}
      className={clsx(
        'brand-logo inline-flex w-full max-w-[120px] text-black focus:outline-none sm:text-white xl:max-w-[125px] 2xl:max-w-[135px] 3xl:max-w-[180px] items-center gap-2',
        className,
      )}
      {...props}
    >
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
      <div className='hidden 2xl:block text-xl primary-nav opacity-60 font-thin'>Zaia Suites</div>
    </Link>
  );
};

export default Logo;
