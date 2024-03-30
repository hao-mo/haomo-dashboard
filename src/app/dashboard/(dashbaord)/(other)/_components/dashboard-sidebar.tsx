'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useKeydown } from '@/hooks/use-keydown';
import { useTabKeydown } from '@/hooks/use-tab-keydown';

import { cn } from '@/utils';

import { DashboardSidebarNav } from './dashboard-sidebar-nav';
import { Hamburger } from './hamburger';

export const DashboardSidebar = () => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const isTablet = useBreakpoint('lg', 'max');

  useTabKeydown(ref);

  useKeydown('Escape', () => {
    if (open && isTablet) setOpen(false);
  });

  useClickOutside(ref, () => {
    if (open && isTablet) setOpen(false);
  });

  return (
    <aside
      ref={ref}
      className={cn(
        'absolute z-5 h-full w-64 overflow-visible border-r border-border bg-background transition-all duration-500 ease-in-expo lg:relative lg:translate-x-0',
        open ? 'translate-x-0 shadow-sm' : '-translate-x-full'
      )}
    >
      <div className='relative'>
        <div className='sticky top-0 flex h-16 items-center justify-center border-b border-border px-4 lg:px-6'>
          <Link
            href='/dashboard'
            className='flex w-full items-center justify-center'
            passHref
          >
            <Button
              variant='outline'
              className='w-full'
            >
              <ArrowLeftIcon
                size={16}
                className='mr-2'
              />
              Back to Dashboard
            </Button>
          </Link>
          <Hamburger
            className='absolute left-full top-half ml-4 -translate-y-half lg:hidden'
            open={open}
            toggleOpen={() => setOpen(!open)}
          />
        </div>
        <nav className='overflow-y-auto overflow-x-hidden no-scrollbar'>
          <ul className='flex flex-col'>
            <DashboardSidebarNav />
          </ul>
        </nav>
      </div>
    </aside>
  );
};
