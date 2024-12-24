'use client';

import Link from 'next/link';
import { Routes } from '@/config/routes';
import ProfileMenu from '@/components/header/profile-menu';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const menuItems = [
  {
    id: 1,
    label: 'Book',
    path: '#book',
  },
  {
    id: 2,
    label: 'Reviews',
    path: '#reviews',
  },
  {
    id: 3,
    label: 'Listings',
    path: '#listings',
  },
  {
    id: 4,
    label: 'Location',
    path: '#location',
  },
  {
    id: 5,
    label: 'FAQ',
    path: '#faq',
  },
  // {
  //   id: 5,
  //   label: 'Other Pages',
  //   path: '',
  //   dropdownItems: [
  //     {
  //       id: 1,
  //       label: 'Vendor Profile',
  //       path: Routes.public.userID('fabio-jaction'),
  //     },
  //     {
  //       id: 2,
  //       label: 'Listing Details',
  //       path: '/listing/perfect-set-up-for-lake-union-cruising',
  //     },
  //     {
  //       id: 3,
  //       label: 'Coming Soon',
  //       path: Routes.public.trips,
  //     },
  //     {
  //       id: 4,
  //       label: 'Sign In',
  //       path: Routes.auth.signIn,
  //     },
  //     {
  //       id: 5,
  //       label: 'Sign Up',
  //       path: Routes.auth.signUp,
  //     },
  //     {
  //       id: 6,
  //       label: 'Forgot Password',
  //       path: Routes.auth.forgotPassword,
  //     },
  //   ],
  // },
];

export default function Menu() {
  return (
    <nav className="primary-nav hidden items-center justify-between md:flex md:gap-4">
      <ul className="hidden flex-wrap md:flex">
        {menuItems.map((item) => (
          <Fragment key={item.id}>
            {
              <li key={item.id}>
                <Link href={item.path} className={`${item.id === 1 ? 'border' : ''} rounded-xl px-5 py-3 capitalize text-white`}>
                  {item.label}
                </Link>
              </li>
            }
          </Fragment>
        ))}
      </ul>
      {/* <ProfileMenu className="hidden md:block" /> */}
    </nav>
  );
}
