import { listingData } from 'public/data/listing-details';
import RelatedListingBlock from '@/components/listing-details/related-listings/related-listings-block';
import ListingDetails from '@/components/listing-details/listing-details-block';
import SubscriptionBlock from '@/components/subscription/subscription-block';
import GalleryBlock from '@/components/listing-details/gallery-block';
import ReserveBottomMenu from '@/components/listing-details/booking-form/reserve-bottom-menu';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = listingData[Number(slug) - 1];
  if (!listing) return {};

  return {
    metadataBase: new URL('https://zaia-suites.com'), // Set your production domain here
    title: `${listing.details.name} | Apartment in Gennadi, Rhodes`,
    description: listing.shortDescription,
    openGraph: {
      title: `${listing.details.name} | Apartment in Gennadi, Rhodes`,
      description: `${listing.shortDescription}`,
      images: listing.gallery?.[0] ? [{ url: listing.gallery[0], alt: listing.details.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.details.name} | Apartment in Gennadi, Rhodes`,
      description: `${listing.shortDescription}`,
      images: listing.gallery?.[0] ? [listing.gallery[0]] : [],
    },
  };
}

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
