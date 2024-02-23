'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { siteRoutes } from '@/lib/routes';
import { fadeInLeft } from '@/lib/transitions';
import { cn } from '@/utils';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { MotionTypography } from '../typography';

import { useSidebar } from '.';

export const SidebarNav = () => {
  const [_, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    startTransition(() => router.push(href));
  };

  return (
    <TooltipProvider
      delayDuration={500}
      disableHoverableContent
    >
      <nav className='no-scrollbar mt-4 flex-1 overflow-y-auto'>
        <ul className='flex flex-col px-4'>
          {siteRoutes.map((route) => (
            <SidebarNavItem
              key={`sidebar-nav-item-${route.name}`}
              icon={route.icon}
              name={route.name}
              isActive={pathname === route.href}
              handleClick={() => handleClick(route.href)}
            />
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  );
};

interface SidebarNavItemProps {
  name: string;
  handleClick: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
}

const SidebarNavItem = ({ icon, name, handleClick, isActive }: SidebarNavItemProps) => {
  const { isVisible } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        onClick={handleClick}
      >
        <li
          className={cn(
            'group relative my-1 flex h-10 cursor-pointer items-center overflow-hidden rounded-md p-2.5 font-medium transition-colors duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground',
            isActive && 'text-primary'
          )}
        >
          <span className='flex items-center justify-center'>{icon}</span>
          <div className='flex-1 overflow-hidden'>
            <AnimatePresence
              mode='wait'
              initial={false}
            >
              {isVisible && (
                <MotionTypography
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  variants={fadeInLeft}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  className='ml-4 inline-block flex-1'
                >
                  {name}
                </MotionTypography>
              )}
            </AnimatePresence>
          </div>
        </li>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
