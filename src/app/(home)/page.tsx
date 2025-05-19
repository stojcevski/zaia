import SubscriptionBlock from '@/components/subscription/subscription-block';
import TestimonialBlock from '@/components/home/testimonial-block';
import HeroBanner from '@/components/home/hero-banner';
import Listings from '@/components/home/listings';
import PricingTestimonials from '@/components/pricing/pricing-testimonials';
import LocationBlock from '@/components/listing-details/location-block';
import ContactBlock from '@/components/listing-details/contact-block';

export default function HomePage() {
  return (
    <>
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
      <SubscriptionBlock sectionClassName="4xl:!px-16" />
    </>
  );
}
