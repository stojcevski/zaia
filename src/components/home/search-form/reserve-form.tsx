'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import DatePickerInput from '@/components/home/search-form/daterange-picker';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import Input from '@/components/ui/form-fields/input';
import Counter from '@/components/ui/counter';
import Notification from '@/components/ui/notification';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
  listing: string;
};

interface ReserveListingFormProps {
  listing: string;
}

export default function ReserveListingForm({ listing }: ReserveListingFormProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 11)));
  const [searchBox, setSearchBox] = useState<any>();
  const [peopleCount, setPeopleCount] = useState(1);
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [emailError, setEmailError] = useState('');
  const randVisitors = (Math.random() * (10 - 8) + 2).toFixed(0);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setEmailError('');
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    const queryObj: QueryStringType & { email: string; people: number } = {
      departureDate: format(startDate, 'yyyy-MM-dd'),
      returnDate: format(endDate, 'yyyy-MM-dd'),
      listing,
      email,
      people: peopleCount,
    };
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryObj),
      });
      if (!res.ok) {
        throw new Error('Failed to send email');
      }
      setNotification({ message: 'Your inquiry has been sent!', type: 'success' });
      // Clear form fields
      setEmail('');
      setPeopleCount(1);
      setStartDate(new Date(new Date().setDate(new Date().getDate() + 1)));
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 11)));
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ message: 'Failed to send email. Please try again.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div
      className="relative w-full max-w-[450px] rounded-lg bg-white p-6 shadow-card sm:m-0 sm:max-w-[380px] sm:p-7 sm:pt-9 md:max-w-[400px]  lg:rounded-xl xl:max-w-[460px] xl:p-9 4xl:max-w-[516px] 4xl:p-12  border-gray-lighter"
      style={{ zIndex: 1 }}
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
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          Check Price
        </Button>
        {notification && (
          <Text
            className={`mt-2 text-center font-semibold transition-opacity duration-300 ${
              notification.type === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {notification.message}
          </Text>
        )}
        {emailError && (
          <Text className="text-red-500 text-xs mt-1">{emailError}</Text>
        )}
      </form>
      <Text className=" leading-6 text-orange-500 opacity-90 font-bold sm:block 3xl:leading-8 4xl:mb-6 4xl:text-sm px-2 text-center">
        {/* {randVisitors} are looking right now */}
      </Text>
    </div>
  );
}
