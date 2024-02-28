'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteRoutes } from '@/lib/routes';
import { fadeInLeft } from '@/lib/transitions';
import type { IRoute } from '@/lib/types';
import { cn } from '@/utils';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { MotionTypography } from '../ui/typography';

import { useSidebar } from './hooks/useSidebar';

export const SidebarNav = () => {
  const pathname = usePathname();

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
              route={route}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  );
};

interface SidebarNavItemProps {
  route: IRoute;
  pathname: string;
}

const SidebarNavItem = ({ route, pathname }: SidebarNavItemProps) => {
  const { isVisible } = useSidebar();

  return (
    <Tooltip>
      <li className='relative'>
        <TooltipTrigger asChild>
          <Link
            href={route.href}
            className={cn(
              'group relative my-1 flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-md p-2.5 font-medium transition-colors duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground',
              pathname === route.href && 'text-primary'
            )}
          >
            {route.icon && <span className='flex items-center justify-center'>{route.icon}</span>}
            <div className='ml-4 flex-1 overflow-hidden text-left '>
              <MotionTypography
                initial={false}
                animate={isVisible ? 'show' : 'hidden'}
                variants={fadeInLeft}
                transition={{ duration: 0.2, ease: 'linear' }}
                className='block'
              >
                {route.name}
              </MotionTypography>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side='right'
          sideOffset={8}
        >
          <p>{route.name}</p>
        </TooltipContent>
      </li>
    </Tooltip>
  );
};
