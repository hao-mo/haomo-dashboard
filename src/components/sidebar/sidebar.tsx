'use client';

import type { Variants } from 'framer-motion';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, XIcon } from 'lucide-react';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef } from 'react';

import { siteConfig } from '@/lib/site-config';
import { fadeIn, fadeInLeft } from '@/lib/transitions';
import { cn } from '@/utils';

import { MotionBox } from '../motion-box';
import { ThemedLogo } from '../themed-logo';
import { Button } from '../ui/button';
import { MotionTypography } from '../ui/typography';
import { UserAccountDropdown } from '../user-account-dropdown';

import { useSidebar } from './hooks/useSidebar';
import { useSidebarHandlers } from './hooks/useSidebarHandlers';
import { SidebarNav } from './sidebar-nav';

const sidebarVariants: Variants = {
  expanded: { width: '18rem', x: 0 },
  collapsed: { width: '4.5rem', x: 0 },
  hidden: { width: '18rem', x: '-150%' },
};

export const Sidebar = memo(() => {
  const { ref, isTabletView, isVisible, animationState } = useSidebarHandlers();

  return (
    <>
      <m.aside
        ref={ref}
        className={cn(
          'absolute z-10 flex h-screen flex-col border-r border-border bg-background shadow-md lg:static'
        )}
        initial={false}
        animate={animationState}
        variants={sidebarVariants}
        transition={{ duration: 0.2, ease: 'linear' }}
      >
        <SidebarHeader />
        <SidebarNav />
        <UserAccountDropdown />
      </m.aside>
      <AnimatePresence mode='wait'>
        {isTabletView && isVisible && (
          <MotionBox
            id='sidebar-overlay'
            className='absolute z-[8] h-screen w-full bg-black/80 backdrop-blur-sm'
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={fadeIn}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

const SidebarHeader = memo(() => {
  const { isVisible } = useSidebar();
  return (
    <header className='relative flex h-20 items-center justify-between border-b border-border p-4'>
      <Link
        href='/'
        className='flex items-center focus-visible:outline-none'
      >
        <ThemedLogo />
        <div className='ml-4 overflow-hidden'>
          <AnimatePresence
            mode='wait'
            initial={false}
          >
            {isVisible && (
              <MotionTypography
                as='h1'
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={fadeInLeft}
                transition={{ duration: 0.2, ease: 'linear' }}
                className='max-w-48 text-base font-bold'
              >
                {siteConfig.name}
              </MotionTypography>
            )}
          </AnimatePresence>
        </div>
      </Link>
      <SidebarToggle />
    </header>
  );
});

SidebarHeader.displayName = 'SidebarHeader';

const SidebarToggle = memo(() => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isTabletView, isVisible, setIsVisible } = useSidebar();

  const toggleExpanded = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!ref.current) return;
    if (isTabletView && isVisible) {
      ref.current.focus();
    }
  }, [isTabletView, isVisible, ref]);

  return (
    <Button
      ref={ref}
      variant={isTabletView ? 'ghost' : 'default'}
      size='circle'
      onClick={toggleExpanded}
      className={cn(
        'absolute rounded-half',
        isTabletView
          ? '-right-16 top-half -translate-y-half bg-transparent text-white hover:bg-muted-foreground/30 hover:text-white'
          : ' -bottom-4 -right-4'
      )}
    >
      {isTabletView ? (
        <XIcon size={24} />
      ) : (
        <ChevronLeft
          size={16}
          className={cn('transition-transform duration-200', isVisible ? 'rotate-0' : 'rotate-180')}
        />
      )}
    </Button>
  );
});

SidebarToggle.displayName = 'SidebarToggle';
