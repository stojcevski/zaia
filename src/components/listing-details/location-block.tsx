'use client';

import MapView from '@/components/ui/map-view';
import Section from '@/components/ui/section';

export default function LocationBlock() {
  return (
    <Section
      className="py-5 xl:py-7 w-full"
      title="location"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl mb-2"
      description="Gennadi, Rhodes"
      descriptionClassName="!text-gray !text-base w-full"
    >
      <div className="mt-6 overflow-hidden rounded-xl w-full flex items-center">
        <MapView mapContainerClassName="flex  items-center w-full h-[230px] sm:h-[400px] xl:h-[600px]" />
      </div>
    </Section>
  );
}
