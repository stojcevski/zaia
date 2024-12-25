import { listingData } from 'public/data/listing-details';
import RelatedListingBlock from '@/components/listing-details/related-listings/related-listings-block';
import ListingDetails from '@/components/listing-details/listing-details-block';
import SubscriptionBlock from '@/components/subscription/subscription-block';
import GalleryBlock from '@/components/listing-details/gallery-block';
import ReserveBottomMenu from '@/components/listing-details/booking-form/reserve-bottom-menu';

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <div className="container-fluid w-full 3xl:!px-12">
        <GalleryBlock images={listingData[Number(slug) - 1].gallery} />
        <ListingDetails listing={slug} />
        <RelatedListingBlock />
      </div>
      <SubscriptionBlock sectionClassName="3xl:!px-12 4xl:!px-12" />
      <ReserveBottomMenu listing={slug} />
    </>
  );
}
