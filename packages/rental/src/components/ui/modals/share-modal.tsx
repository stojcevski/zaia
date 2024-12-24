'use client';

import { useEffect, useState } from 'react';
import Text from '@/components/ui/typography/text';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { useModal } from '@/components/modals/context';
import ActionIcon from '@/components/ui/action-icon';


export default function ShareModal() {
  const { data } = useModal();
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState(
    data.shareUrl,
  );

  useEffect(() => {
    if (copied) {
      navigator.clipboard.writeText(state);
      setTimeout(() => {
        setCopied(!copied);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);

  return (
    <div className="relative z-50 mx-auto w-full max-w-full overflow-hidden rounded-xl bg-white p-4 xs:w-[480px] sm:w-[520px] sm:p-6 lg:p-8">
      <Text tag="h3" className="mt-2 text-base leading-8 md:!text-xl">
        Copy the link
      </Text>
      <div className="mt-4 flex w-full items-center justify-between gap-4 rounded-lg bg-gray-lightest p-2 sm:px-5 sm:py-4 md:mt-7">
        <p className="w-3/4 overflow-clip text-ellipsis   text-sm font-normal text-gray">
          {state}
        </p>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => setCopied(!copied)}
          className="focus:!ring-0"
          title="copy link"
        >
          {copied ? (
            <CheckCircleIcon className="h-6 w-6 rounded-full bg-white text-green-400" />
          ) : (
            <DocumentDuplicateIcon className="h-6 w-6 text-gray" />
          )}
        </ActionIcon>
      </div>
    </div>
  );
}
