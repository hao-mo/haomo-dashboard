'use client';

import { AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';

import { fadeInLeft } from '@/lib/transitions';
import { cn } from '@/utils';

import { Button } from '../button';
import { ThemedLogo } from '../themed-logo';
import { MotionTypography } from '../typography';

import { SidebarNav } from './sidebar-nav';

interface SidebarContextType {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const Sidebar = memo(() => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const contextValue: SidebarContextType = useMemo(
    () => ({
      expanded,
      setExpanded,
    }),
    [expanded, setExpanded]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        className={cn(
          'absolute z-10 flex h-screen flex-col transition-all duration-200 ease-linear lg:static',
          expanded ? 'w-72' : 'w-18'
        )}
      >
        <SidebarHeader />
        <SidebarNav />
      </aside>
    </SidebarContext.Provider>
  );
});

Sidebar.displayName = 'Sidebar';

const SidebarHeader = memo(() => {
  const { expanded } = useSidebar();
  return (
    <header className='relative flex h-20 items-center justify-between border-b border-border p-4'>
      <Link
        href='/'
        className='flex items-center'
      >
        <ThemedLogo />
        <div className='ml-4 overflow-hidden'>
          <AnimatePresence
            mode='wait'
            initial={false}
          >
            {expanded && (
              <MotionTypography
                as='h1'
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={fadeInLeft}
                transition={{ duration: 0.2, ease: 'linear' }}
                className='max-w-48 text-base font-bold'
              >
                HaoMo
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
  const { expanded, setExpanded } = useSidebar();

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Button
      size='circle'
      onClick={toggleExpanded}
      className='absolute -bottom-4 -right-4 rounded-half text-white'
    >
      <ChevronLeft
        size={16}
        className={cn('transition-transform duration-200', expanded ? 'rotate-0' : 'rotate-180')}
      />
    </Button>
  );
});

SidebarToggle.displayName = 'SidebarToggle';
