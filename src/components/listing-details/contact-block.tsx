'use client';

import MapView from '@/components/ui/map-view';
import Section from '@/components/ui/section';
import { EmailIcon } from '@/components/icons/email-icon';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';

export default function ContactBlock() {
  return (
    <Section
      className="py-5 xl:py-5 w-full px-4"
      title="contact"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl mb-2"
      description="Despoina Zaimai"
      descriptionClassName="!text-gray !text-base w-full"
    >
      <div className="mt-6 overflow-hidden rounded-xl w-full flex flex-col md:flex-row md:gap-12 gap-2 md:items-center">
        <div className='flex gap-2 items-center'>
          <EmailIcon className='w-[22px]' /> 
          <a
            href="mailto:zaia_suites@outlook.com"
            className="text-blue-600 underline"
          >
            zaia_suites@outlook.com
          </a>
        </div>
        <div className='flex gap-2 items-center'>
          <WhatsappIcon className='w-[22px]' /> 
          <a
            href="https://wa.me/306949306114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            +30 6949306114
          </a>
        </div>
      </div>
    </Section>
  );
}
