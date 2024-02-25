'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { allRoutes } from '@/lib/routes';
import { fadeInUp } from '@/lib/transitions';

import { MotionTypography } from '../typography';

const HOME_PAGE = '/';

export const PageTitle = () => {
  const pathname = usePathname();

  const currentPageName =
    pathname === HOME_PAGE
      ? 'Home'
      : allRoutes.find((route) => route.href === pathname)?.name ?? '404';

  return (
    <div className='overflow-hidden'>
      <AnimatePresence
        mode='wait'
        initial={false}
      >
        <MotionTypography
          className='text-lg font-bold md:text-xl'
          key={pathname}
          as='h2'
          initial='hidden'
          animate='show'
          exit='hidden'
          variants={fadeInUp}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {currentPageName}
        </MotionTypography>
      </AnimatePresence>
    </div>
  );
};
