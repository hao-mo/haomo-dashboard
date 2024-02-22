'use client';

import Image from 'next/image';

import Logo from '@/public/icon.ico';

export const ThemedLogo = () => {
  return (
    <div className='relative size-10 overflow-hidden'>
      <Image
        src={Logo}
        className='w-full object-contain object-center'
        alt='Logo'
        priority
      />
    </div>
  );
};
