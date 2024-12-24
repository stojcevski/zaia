'use client';

import { listingData } from 'public/data/listing-details';
import ListingDetailsHeroBlock from '@/components/listing-details/hero-block';
import DescriptionBlock from '@/components/listing-details/descripton-block';
import LocationBlock from '@/components/listing-details/location-block';
import ReviewBlock from '@/components/listing-details/review-block';
import ReserveListingForm from '../home/search-form/reserve-form';
import AmenitiesBlock from './amenities-block';

export default function ListingDetails({ listing }: { listing: string }) {

  const vendorData = listingData[Number(listing) - 1];
  return (
    <>
      <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
        <div className="w-full">
          <ListingDetailsHeroBlock vendor={vendorData.details} />
          <DescriptionBlock description={vendorData.description} />
          <AmenitiesBlock equipment={vendorData.equipment} />
          <LocationBlock />
          <ReviewBlock reviewsData={vendorData.reviewsData} />
        </div>
        <div className="hidden w-full max-w-sm pb-11 lg:block xl:max-w-md 3xl:max-w-lg">
          <div className="sticky top-32 4xl:top-40">
            <ReserveListingForm />
          </div>
        </div>
      </div>
    </>
  );
}
