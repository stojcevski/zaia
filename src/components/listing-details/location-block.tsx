'use client';

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
        <iframe
          title="Gennadi, Rhodes Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=27.0497%2C35.9916%2C28.5897%2C36.0116&amp;layer=mapnik&amp;marker=36.021119%2C27.921630"
          style={{ border: 0 }}
          className="flex items-center w-full h-[230px] sm:h-[400px] xl:h-[600px]"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </Section>
  );
}
