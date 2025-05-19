'use client';

import Button from '@/components/ui/button';

export default function BottomCtaBlock() {
  return (
    <div className="max-w-2xl mx-auto text-center items-center my-20 px-4 flex flex-col gap-8">
      <p className="text-2xl font-semibold text-stone-900 mb-2 flex flex-col">
        Escape to the peaceful south of Rhodes.<br />
        Book your sea view apartment at Zaia Suites today.
      </p>
      <Button
        type="button"
        className="!py-3 !px-8 !font-bold uppercase w-fit text-white"
        rounded="lg"
        size="xl"
        onClick={() => {
          document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Book Now
      </Button>
    </div>
  );
}
