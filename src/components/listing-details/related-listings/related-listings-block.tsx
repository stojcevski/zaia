'use client';

import { topBoats } from 'public/data/zaia-rentals';
import ListingCard from '@/components/ui/cards/listing';
import Section from '@/components/ui/section';

export default function RelatedListingBlock() {
  return (
    <Section
      className="pt-8 xl:pt-16"
      headerClassName="items-end gap-5"
      title="You may also like"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 pt-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:gap-y-10">
        {topBoats.slice(2, 6).map((item, index) => (
          <ListingCard
            id={`related-listing-${index}`}
            key={`related-listing-${index}`}
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
    </Section>
  );
}
