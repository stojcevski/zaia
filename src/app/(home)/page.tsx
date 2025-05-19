import SubscriptionBlock from '@/components/subscription/subscription-block';
import TestimonialBlock from '@/components/home/testimonial-block';
import HeroBanner from '@/components/home/hero-banner';
import Listings from '@/components/home/listings';
import PricingTestimonials from '@/components/pricing/pricing-testimonials';
import LocationBlock from '@/components/listing-details/location-block';
import ContactBlock from '@/components/listing-details/contact-block';
import Button from '@/components/ui/button';
import BottomCtaBlock from '@/components/home/bottom-cta-block';

export const metadata = {
  title: 'Holiday Apartments in Gennadi, Rhodes | Zaia Suites',
  description: 'Sea view apartments with private pool in Gennadi, Rhodes. Family-friendly, peaceful, and steps from the beach. Book direct at Zaia Suites & Living.',
};

export default function HomePage() {
  return (
    <>
      {/* Add a single h1 heading for SEO, ideally at the top of the page */}
      <h1 className="sr-only">
        Zaia Suites & Living – Holiday Apartments in Gennadi, Rhodes
      </h1>
      <HeroBanner />
      <TestimonialBlock />
      <Listings />
      <div id='location' className='p-8 flex w-full'>
        <LocationBlock />
      </div>
      <div id='contact' className='p-8 flex w-full'>
        <ContactBlock />
      </div>
      <div id='faq'>
        <PricingTestimonials />
      </div>
      <BottomCtaBlock />
      <SubscriptionBlock sectionClassName="4xl:!px-16" />
    </>
  );
}
