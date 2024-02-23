'use client';

import Image from 'next/image';

import Logo from '@/public/icon.ico';

import { cn } from '@/utils';

export const ThemedLogo = ({ className }: WithClassName) => {
  return (
    <div className={cn('relative size-10 overflow-hidden', className)}>
      <Image
        src={Logo}
        className='w-full object-contain object-center'
        alt='Logo'
        priority
        sizes='2.5rem'
      />
    </div>
  );
};
