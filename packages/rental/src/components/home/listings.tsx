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
    </div>
  );
}

export default function Listings() {
  const { state } = useTimeout();

  return (
    <Section
      id='listings'
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Our listings"
      description=""
      headerClassName="items-start mb-4 md:mb-5 xl:mb-6 gap-5"
    >
      {!state && <ListingCardLoader />}
      {state && <RentalsGrid />}
    </Section>
  );
}
