'use client';

import { useTimeout } from '@/hooks/use-timeout';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Autoplay,
} from '@/components/ui/slider';
import TestimonialCard from '@/components/ui/cards/testimonial';
import BlockLoader from '@/components/ui/loader/block-loader';
import { testimonials } from 'public/data/testimonials';
import ActionIcon from '@/components/ui/action-icon';
import Section from '@/components/ui/section';

export default function TestimonialBlock() {
  const { state } = useTimeout();

  return (
    <Section
      id='reviews'
      className="group/section lg:container-fluid mt-12 overflow-hidden pl-4 sm:pl-6 lg:mt-24"
      title="Reviews"
      headerClassName="items-start mb-4 lg:mb-5 xl:mb-6"
      rightElement={
        <div className="flex flex-col sm:flex-row items-start justify-start gap-2 my-1 w-full">
          <span className='text-sm sm:pr-4'>
            One of the most loved homes on
            <a href='https://www.airbnb.com/rooms/1022215396986330198/reviews?source_impression_id=p3_1734456763_P3NSgcat4WcMPzw1' target='blank' className=' underline pl-1'>Airbnb</a>.
          </span>
          <div className='flex gap-1 items-center'>
            <img alt="google-logo" width={70} height={50} src={"/icons/google.png"} />
            <StarIcon color='#faca15' className="pb-px w-4" />
            <p className="ml-1 text-sm font-bold text-gray-600 ">5.0</p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-600" />
            <a
              href='https://www.google.com/search?sca_esv=32e55b09f5ce6c02&rlz=1C5CHFA_enSI988SI990&sxsrf=ADLYWIK_xzZVeGT4yv-3bTyr0jY6RaTzcw:1734463145104&uds=ADvngMjcH0KdF7qGWtwTBrP0nt7dxrIacCNYNxMEPQSV4V72mm1d72G8F66Z-_lWpsjiOCTTmCdP5FxVDh3dAOl54sqQ-DPaJeDTXjcz9kUiEsU9v9W8GqZtJbAEZhbsM1xjsC9PgxyqQHbr9n2zMaobpFvTcTckAkXWl25TNCWbKbiZFXSCxeU&q=Zaia+Suites+%26+Living+Reviews&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7qv7qKcyBVI5KdOkVTiq8jBFx__P9P07f8hXhUYePyER_YbFTFoMO_3qwUX0k3L7tWOZPYJMuunIqV45LjWRTaTwST-h2BS5MyZxTrEdiku6gMspGg%3D%3D&hl=en-SI&sa=X&ved=2ahUKEwjC-o7dwq-KAxVgJhAIHXJeC4IQ_4MLegQIThAN&biw=1512&bih=857&dpr=2'
              target='blank'
              className="text-sm font-medium text-gray-600 underline hover:no-underline"
            >
              23 reviews
            </a>
          </div>
        </div>
      }
    >
      {!state && <BlockLoader />}
      {state && (
        <div className="testimonial relative">
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={true}
            slidesPerView={4}
            spaceBetween={12}
            navigation={{
              nextEl: '.testimonial-button-next',
              prevEl: '.testimonial-button-prev',
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 1.6,
              },
              580: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {testimonials?.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`}>
                <TestimonialCard
                  name={item.name}
                  description={item.description}
                  location={item.location}
                  rating={item.rating}
                  className="mb-1"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <ActionIcon
            rounded="full"
            color="invert"
            className="testimonial-button-prev invisible absolute left-[25px] top-1/2 z-10 hidden -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0 md:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            color="invert"
            className="testimonial-button-next invisible absolute right-[25px] top-1/2 z-10 hidden -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-[10px] md:flex lg:group-hover/section:-right-[19px]"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </ActionIcon>
        </div>
      )}
    </Section>
  );
}
