'use client';

import { listingData } from 'public/data/listing-details';
import { useAtom } from 'jotai';
import { drawerStateAtom } from '@/components/drawers/view';
import { Staricon } from '@/components/icons/star-icon';
import Button from '@/components/ui/button';
import { useState } from 'react';
import DatePickerInput from '@/components/home/search-form/daterange-picker';
import Text from '@/components/ui/typography/text';
import Input from '@/components/ui/form-fields/input';
import Counter from '@/components/ui/counter';

export default function ReserveBottomMenu({ listing }: { listing: string }) {
  const [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  const [expanded, setExpanded] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 11)));
  const [peopleCount, setPeopleCount] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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
    const queryObj = {
      departureDate: startDate.toISOString().slice(0, 10),
      returnDate: endDate.toISOString().slice(0, 10),
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
      if (!res.ok) throw new Error('Failed to send email');
      setNotification({ message: 'Your inquiry has been sent!', type: 'success' });
      setEmail('');
      setPeopleCount(1);
      setStartDate(new Date(new Date().setDate(new Date().getDate() + 1)));
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 11)));
      setTimeout(() => {
        setNotification(null);
        setExpanded(false);
      }, 3000);
    } catch {
      setNotification({ message: 'Failed to send email. Please try again.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col w-full items-center bg-white px-4 py-3 shadow-menu-shadow sm:px-6 lg:hidden">
      <div className="flex w-full items-center justify-between">
        {!expanded &&
          <>
            <div>
              {/* <p className="font-bold text-gray-dark">${listingData[Number(listing) - 1].price} / night</p> */}
              <p className="inline-flex items-center gap-2 text-sm text-gray-dark">
                <Staricon className="xl:w-h-5 h-4 w-4 xl:h-5" />
                <span>{listingData[Number(listing) - 1].reviewsData.stats.averageRating}</span>
                <span>( {listingData[Number(listing) - 1].reviewsData.stats.totalReview} reviews )</span>
              </p>
            </div>
            <Button
              size="xl"
              rounded="lg"
              type="button"
              variant="solid"
              onClick={() => setExpanded((v) => !v)}
              className="font-semibold tracking-wide"
            >
              Reserve
            </Button>
          </>
        }
      </div>
      {expanded && (
        <form
          className="w-full mt-12 bg-white rounded-lg flex flex-col gap-3 relative"
          onSubmit={handleFormSubmit}
        >
          {/* X button to minimize */}
          <button
            type="button"
            aria-label="Close"
            className="absolute -top-10 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            onClick={() => setExpanded(false)}
            style={{ lineHeight: 1 }}
          >
            ×
          </button>
          <DatePickerInput
            label="Checkin"
            selected={startDate}
            dateFormat="eee dd / LL / YYYY"
            onChange={(date) => {
              setStartDate(date as Date);
              setEndDate(new Date((date as Date).getTime() + 24 * 60 * 60 * 1000));
            }}
            minDate={new Date()}
            containerClass="mb-2"
            popperClassName="homepage-datepicker"
          />
          <DatePickerInput
            label="Checkout"
            selected={endDate}
            dateFormat="eee dd / LL / YYYY"
            onChange={(date) => setEndDate(date as Date)}
            minDate={endDate || new Date()}
            containerClass="mb-2"
            popperClassName="homepage-datepicker"
          />
          <Input
            type="text"
            size="xl"
            className="h-10 leading-10 md:h-14 md:leading-[56px] w-full"
            inputClassName="!text-sm lg:!text-base pl-[27px] !bg-white rounded-lg border-stone-200 xl:rounded-xl"
            labelClassName="lg:!text-base !mb-2 text-gray-dark"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
          />
          <div className='flex flex-col gap-2 mt-4'>
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
          <Button
            type="submit"
            className="w-full !py-[14px] text-sm !font-bold uppercase leading-6 md:!py-[17px] md:text-base lg:!rounded-xl 3xl:!py-[22px] mt-4 mb-2 bg-stone-900"
            rounded="lg"
            size="xl"
          >
            Check Price
          </Button>
          {notification && (
            <Text
              className={`mt-2 text-center font-semibold transition-opacity duration-300 ${notification.type === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
                }`}
            >
              {notification.message}
            </Text>
          )}
        </form>
      )}
    </div>
  );
}
