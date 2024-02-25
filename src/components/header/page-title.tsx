'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { allRoutes } from '@/lib/routes';
import { easeInExpo, fadeIn } from '@/lib/transitions';

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
          key={pathname}
          as='h2'
          initial='hidden'
          animate='show'
          exit='hidden'
          variants={fadeIn}
          transition={{ duration: 0.3, ease: easeInExpo }}
          className='text-lg font-bold will-change-transform md:text-xl'
        >
          {currentPageName}
        </MotionTypography>
      </AnimatePresence>
    </div>
  );
};
