'use client';

import SubscriptionForm from '@/components/ui/form-fields/subscription-form';
import BannerBlock from '@/components/banner-block/banner-block';

export default function SubscriptionBlock({
  className = 'py-20 px-4 md:pl-0 md:!pb-16 xl:!py-20',
  sectionClassName,
}: {
  className?: string;
  sectionClassName?: string;
}) {
  return (
    <div className='relative'>
      <BannerBlock
        bgImg="/images/banner/7.jpg"
        title="Subscribe and get exclusive deals & offer"
        description="Choose and book your dream holiday home."
        className={className}
        sectionClassName={sectionClassName}
        titleClassName="!text-primary md:!text-white text-2xl 3xl:text-[44px] 3xl:leading-[60px] mb-2 xl:mb-5"
        descriptionClassName="text-sm md:text-base !text-primary md:!text-white text-center md:text-left leading-[22px] md:leading-6 3xl:leading-8 mb-6 md:!mb-8"
        contentWrapperClassName="bg-white shadow-card md:bg-transparent md:shadow-none max-w-[500px] md:max-w-[380px] rounded-lg m-auto md:!mr-auto md:!ml-0 lg:max-w-[440px] xl:max-w-[500px] px-4 pb-4 pt-8 md:px-0 md:pb-0 md:pt-0"
      >
        <SubscriptionForm />
      </BannerBlock>
      <div className='z-10 opacity-90 bg-gradient-to-r from-stone-600 via-stone-500 w-9/12 h-full absolute top-0 hidden sm:block left-6 xl:left-8 rounded-xl px-12'></div>
    </div>
  );
}
