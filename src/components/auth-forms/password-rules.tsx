'use client';

import { InfoIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const PasswordRules = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon size={16} />
      </PopoverTrigger>
      <PopoverContent
        className='w-fit p-4'
        side='right'
        align='start'
        alignOffset={1}
      >
        <p>密碼規則</p>
        <ul className='mt-2 list-inside list-disc space-y-1'>
          <li>至少 8 個字元</li>
          <li>至少包含一個大寫字母</li>
          <li>至少包含一個小寫字母</li>
          <li>至少包含一個數字</li>
          <li>至少包含一個特殊符號</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
