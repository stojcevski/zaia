'use client';

import { VendorTypes } from '@/types';
import { ShareIcon } from '@/components/icons/share-icon';
import { useModal } from '@/components/modals/context';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';

interface ListingDetailsHeroBlockProps {
  vendor: VendorTypes;
}

// share icons
function ShareIcons({ shareUrl }: { shareUrl: string }) {
  const { openModal } = useModal();
  return (
    <div className="mt-1 hidden items-center gap-3 bg-white md:flex 3xl:gap-6">
      <Button
        className="!border-none !bg-stone-300 !p-4 text-gray-dark hover:!bg-stone-600 hover:text-white"
        size="sm"
        variant="outline"
        rounded="pill"
        onClick={() => openModal('SHARE', { shareUrl })}
      >
        <ShareIcon className="h-auto w-5" />
      </Button>
    </div>
  );
}

export default function ListingDetailsHeroBlock({
  vendor,
}: ListingDetailsHeroBlockProps) {
  return (
    <div className="flex justify-between border-b border-gray-lighter pb-6 md:pb-8 2xl:pb-10">
      <div>
        <p className="text-gray-dark">{vendor.location}</p>
        <Text
          tag="h2"
          className="mt-2 !text-2xl uppercase !leading-7 md:!text-[26px] md:!leading-10 2xl:!text-[28px] 4xl:!text-3xl"
        >
          {vendor.listingName}
        </Text>
        <div className="mt-3 flex items-center gap-2 leading-4 text-gray-dark md:mt-4">
          <p>{vendor.listingGuests} guests</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p>{`${vendor.listingBedrooms} bedroom${vendor.listingBedrooms > 1 ? 's' : ''}`}</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p>{`${vendor.listingBeds} bed${vendor.listingBeds > 1 ? 's' : ''}`}</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p>{`${vendor.listingBathrooms} bathroom${vendor.listingBathrooms > 1 ? 's' : ''}`}</p>
        </div>
      </div>
      <div className="relative">
        <ShareIcons shareUrl={vendor.shareUrl} />
      </div>
    </div>
  );
}
