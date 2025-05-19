'use client';

import Text from '@/components/ui/typography/text';
import Accordion from '@/components/ui/accordion';

const accordionData = [
  {
    title: ' Where is Zaia located?',
    text: 'Zaia is located in Gennadi Village, approximately 65 km from Rhodes International Airport in Greece.',
  },
  {
    title: 'What are the nearby attractions?',
    text: 'Nearby attractions include the stunning Gennadi Beach (800m away), local tavernas, bars, and a well-stocked supermarket just a 5-minute walk away. Prasonisi, a popular spot for windsurfing and kitesurfing, is approximately 20 km away.',
  },
  {
    title: 'What amenities are provided in the suites?',
    text: 'Each suite includes: Comfortable bedding. A well-appointed bathroom. A fully equipped kitchen. A living space, often with additional sleeping options like a sofa bed.',
  },
  {
    title: 'Is there air conditioning or Wi-Fi?',
    text: 'Yes, the suites are equipped with modern conveniences, including air conditioning and Wi-Fi.',
  },
  {
    title: 'Is transportation provided to and from the airport?',
    text: 'Transportation is not provided, but taxis and car rentals are available at Rhodes International Airport for your convenience.',
  },
  {
    title: 'Is a car necessary to explore the area?',
    text: 'While Zaia is within walking distance of many amenities, a car is recommended if you plan to explore other parts of Rhodes.',
  },
];

export default function PricingTestimonials() {
  return (
    <div className="container-fluid w-full !max-w-[1248px] pt-12 lg:pt-20 2xl:pb-8 3xl:px-0 3xl:pt-24">
      <div className="text-center">
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-3xl">
          Frequently asked questions
        </Text>
        <Text className="mt-2 text-sm lg:mt-3">
          Everything you need to know about <br className="lg:hidden" /> your
          holiday rental
        </Text>
      </div>
      <div className="mt-8 lg:mt-12 2xl:mt-16">
        {accordionData.map((item) => (
          <Accordion key={item.title} title={item.title} text={item.text} />
        ))}
      </div>
    </div>
  );
}
