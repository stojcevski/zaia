'use client';

import { topBoats } from 'public/data/zaia-rentals';
import { useTimeout } from '@/hooks/use-timeout';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import ListingCard from '@/components/ui/cards/listing';
import Section from '@/components/ui/section';

function RentalsGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topBoats.slice(0, 8).map((item, index) => (
        <ListingCard
          key={`top-boat-grid-${index}`}
          id={`top-boat-grid-${index}`}
          slides={item.thumbnail}
          time={item.time}
          caption={item.caption}
          title={item.title}
          slug={item.slug}
          location={item.location}
          price={item.price}
          ratingCount={item.ratingCount}
          rating={item.rating}
          user={item.user}
        />
      ))}
      <div className='bg-stone-50 p-2 rounded-xl col-span-1 text-md md:text-sm px-2 md:px-4 pb-2'>
          {`At Zaia Suites & Living, we offer seven modern holiday apartments in Gennadi, Rhodes, perfect for families, couples, or small groups. Whether you're planning a week by the sea or a quiet long-term stay, each suite is fully equipped for a comfortable self-catering experience — complete with private pool, sea-view terrace, and parking.
          Our apartments are designed to provide:
           - Space for families, with separate bedrooms and open-plan living
           - Privacy for couples, with serene balconies and peaceful surroundings
           - Independence for long stays, thanks to full kitchens and home comforts
          From the moment you arrive, you’ll enjoy a blend of contemporary design, local charm, and thoughtful amenities that make Zaia Suites more than just a place to stay.
          Browse our apartments to find the one that’s perfect for your Rhodes holiday.`}
        </div>
    </div>
  );
}

export default function Listings() {
  const { state } = useTimeout();

  return (
    <div>
      <Section
        id='listings'
        className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
        title="Our Apartments – Comfort, Space and Sea Views"
        headerClassName="items-start mb-4 md:mb-5 xl:mb-6 gap-5"
      >
        {!state && <ListingCardLoader />}
        {state && <RentalsGrid />}
      </Section>
    </div>
  );
}
