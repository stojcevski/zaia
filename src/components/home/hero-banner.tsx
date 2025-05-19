'use client';

import Image from 'next/image';
import FindTripForm from '@/components/home/search-form/search-form';
import Button from '@/components/ui/button';

export default function HeroBanner() {
  return (
    <>
      <div id='book' className="relative flex min-h-full items-end justify-center px-4 pb-28 pt-48 before:absolute before:left-0 before:top-0 before:z-[1] before:block before:h-1/4 before:w-full before:bg-gradient-to-b before:from-black/60 sm:flex-none sm:justify-start sm:px-0 sm:pb-20 sm:pl-6 sm:pt-[120px] md:pl-16 3xl:pb-[132px] 3xl:pt-[142px] 4xl:pl-[200px]">
        <Image
          src="/images/banner/1.jpg"
          alt="Home banner 1"
          fill
          priority
          className="aspect-[2/1] h-full bg-gray-lighter object-cover"
        />
        <FindTripForm />
        <div className='z-[1] opacity-70 bg-gradient-to-r from-stone-600  w-6/12 h-full absolute top-0 hidden sm:block left-0  px-12'></div>
      </div>
      {/* Homepage Introduction: visible, concise, and placed after h1 but before main content */}
      <div className="max-w-7xl mx-auto text-justify my-10 px-4">
        <p className="text-md text-gray-700">
          {
            `Welcome to Zaia Suites & Living, a peaceful collection of seven holiday apartments in Gennadi, Rhodes, where sea views, serenity, and warm hospitality come together. Nested in the southern part of the island, our family-friendly apartments are designed for travelers who want to relax, explore, and reconnect — whether you're a couple seeking a romantic escape, a family on holiday, or a surfer chasing the waves near Prasonisi.
            Each suite offers a blend of modern comfort and island charm, featuring private entrances, fully equipped kitchens, stylish living areas, and your very own private pool — perfect for a refreshing dip after a day at the beach. Step outside and you’re just minutes away from the Aegean Sea, with unobstructed sea views from your terrace and the sound of nature all around.
            At Zaia Suites, we believe in creating more than just a stay. You’ll find thoughtful amenities such as private parking, fast Wi-Fi, air conditioning, and curated local recommendations to help you make the most of your time in Rhodes. For families, we offer extra space, safety features, and a calm atmosphere ideal for children. For surfers and explorers, we’re conveniently located near some of the best waves on the island.
            Located in Gennadi — a quiet, authentic village on the southeast coast of Rhodes — our suites offer the perfect base to explore hidden beaches, taste local cuisine, and experience the rich history and culture of the island.
            Whether you’re planning a week-long getaway or a long-term escape, Zaia Suites & Living invites you to book direct and experience Rhodes on your own terms. Skip the commissions and enjoy personal service from your hosts — from first inquiry to check-out.`
          }
        </p>
      </div>
    </>
  );
}
