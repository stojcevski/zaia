'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { makeQueryString } from '@/utils/makeQueryString';
import DatePickerInput from '@/components/home/search-form/daterange-picker';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import { Routes } from '@/config/routes';
import Input from '@/components/ui/form-fields/input';
import Counter from '@/components/ui/counter';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
};

export default function ReserveListingForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 11)));
  const [searchBox, setSearchBox] = useState<any>();
  const [peopleCount, setPeopleCount] = useState(1);
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const randVisitors = (Math.random() * (10 - 8) + 2).toFixed(0);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const queryObj: QueryStringType = {
      departureDate: format(startDate, 'yyyy-MM-dd'),
      returnDate: format(endDate, 'yyyy-MM-dd'),
    };
    console.log(queryObj)
  };

  return (
    <div
      className="relative z-[2] w-full max-w-[450px] rounded-lg bg-white p-6 shadow-card sm:m-0 sm:max-w-[380px] sm:p-7 sm:pt-9 md:max-w-[400px]  lg:rounded-xl xl:max-w-[460px] xl:p-9 4xl:max-w-[516px] 4xl:p-12  border-gray-lighter"
    >
      <form
        noValidate
        onSubmit={handleFormSubmit}
      >
        
        <DatePickerInput
          label="Checkin"
          selected={startDate}
          dateFormat="eee dd / LL / YYYY"
          onChange={(date) => {
            setStartDate(date as Date);
            setEndDate(addDays(date as Date, 1));
          }}
          minDate={new Date()}
          containerClass="mb-3"
          popperClassName="homepage-datepicker"
        />
        <DatePickerInput
          label="Checkout"
          selected={endDate}
          dateFormat="eee dd / LL / YYYY"
          onChange={(date) => setEndDate(date as Date)}
          minDate={endDate || new Date()}
          containerClass="mb-3"
          popperClassName="homepage-datepicker"
        />
        <div className='flex flex-col sm:flex-row gap-8 sm:gap-2'>
          <Input
            type="text"
            size="xl"
            className="h-10 leading-10 md:h-14 md:leading-[56px] w-full"
            inputClassName="!text-sm lg:!text-base pl-[27px] !bg-white rounded-lg border-stone-200 xl:rounded-xl"
            labelClassName="lg:!text-base !mb-2 text-gray-dark"
            placeholder="Email"
          />
          <div className='flex flex-col gap-2'>
            <Text className="block !text-sm text-gray-dark lg:!text-xs">
              Number of people
            </Text>
            <Counter
              count={peopleCount}
              countBy={1}
              onCount={(val) => setPeopleCount(val)}
              buttonClassName="rounded-lg !px-2 w-[30px]"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full !py-[14px] text-sm !font-bold uppercase leading-6 md:!py-[17px] md:text-base lg:!rounded-xl 3xl:!py-[22px] mt-12 sm:mt-12 mb-3 bg-stone-900"
          rounded="lg"
          size="xl"
        >
          Reserve
        </Button>
      </form>
      <Text className=" leading-6 text-orange-500 opacity-90 font-bold sm:block 3xl:leading-8 4xl:mb-6 4xl:text-sm px-2 text-center">
        {/* {randVisitors} are looking right now */}
      </Text>
    </div>
  );
}
