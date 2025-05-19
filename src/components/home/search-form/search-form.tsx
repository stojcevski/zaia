'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { makeQueryString } from '@/utils/makeQueryString';
import DatePickerInput from '@/components/home/search-form/daterange-picker';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import { Routes } from '@/config/routes';
import { StarIcon } from '@heroicons/react/24/solid';
import Input from '@/components/ui/form-fields/input';
import Counter from '@/components/ui/counter';
import Notification from '@/components/ui/notification';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
};

export default function FindTripForm() {
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
  const [emailError, setEmailError] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const randVisitors = (Math.random() * (10 - 8) + 2).toFixed(0);

  const validateEmail = (email: string) => {
    // Simple email regex
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
      email,
      people: peopleCount,
    };
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryObj),
      });
      if (!res.ok) {
        throw new Error('Failed to send email');
      }
      setNotification({ message: 'Your inquiry has been sent!', type: 'success' });
    } catch (err) {
      setEmailError('Failed to send email. Please try again.');
      setNotification({ message: 'Failed to send email. Please try again.', type: 'error' });
    }
  };

  return (
    <div
      className="relative z-[2] w-full max-w-[450px] rounded-lg bg-white p-6 shadow-2xl sm:m-0 sm:max-w-[380px] sm:p-7 sm:pt-9 md:max-w-[400px] md:shadow-none lg:rounded-xl xl:max-w-[460px] xl:p-9 4xl:max-w-[516px] 4xl:p-12"
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className="pb-8 sm:pb-12 mb-3 sm:mb-0">
          <Text
            tag="h1"
            className="leading-12 mb-2 !text-xl !font-black uppercase text-stone-800 sm:!text-[24px] sm:!leading-7  4xl:!text-4xl 4xl:!leading-[52px]"
          >
            Select dates<br />
            & book your holiday
          </Text>
          {/* 🟩 Primary CTA subtitle */}
          <p className="text-base text-stone-700 font-medium mb-3">
            Direct and commission-free.
          </p>
          <div className="flex items-center justify-start gap-1 my-4 w-full">
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
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <div className='flex flex-col gap-2 mt-4 md:mt-0'>
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
          className="w-full !py-[14px] text-sm !font-bold uppercase leading-6 md:!py-[17px] md:text-base lg:!rounded-xl 3xl:!py-[22px] mt-12 sm:mt-12 mb-3 bg-stone-800 hover:bg-stone-900 text-white"
          rounded="lg"
          size="xl"
        >
          Check price
        </Button>
      </form>
      <Text className=" leading-6 text-orange-500 opacity-90 font-bold sm:block 3xl:leading-8 4xl:mb-6 4xl:text-sm px-2 text-center">
        {/* {randVisitors} are looking right now */}
      </Text>
    </div>
  );
}
