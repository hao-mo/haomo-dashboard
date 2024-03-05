'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteRoutes } from '@/lib/routes';
import type { IRoute } from '@/lib/types';
import { cn } from '@/utils';

export const MainSidebarNav = () => {
  const pathname = usePathname();
  return (
    <>
      {siteRoutes.map((route) => (
        <MainSidebarNavItem
          key={`main-sidebar-nav-item-${route.href}`}
          isActive={pathname === route.href}
          route={route}
        />
      ))}
    </>
  );
};

const MainSidebarNavItem = ({ isActive, route }: { isActive: boolean; route: IRoute }) => {
  return (
    <li className='relative'>
      <Link
        href={route.href}
        className={cn(
          'group/item relative flex h-10 w-10 items-center rounded text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground group-data-[state=expanded]:w-full',
          isActive && 'text-primary'
        )}
        aria-current={isActive}
      >
        {route.icon && (
          <span className='absolute left-0 top-0 flex size-10 items-center justify-center rounded'>
            {route.icon}
          </span>
        )}
        <span className='absolute left-12 min-w-32 -translate-x-7 text-sm opacity-0 transition-[transform,opacity] duration-200 group-data-[state=expanded]:-translate-x-0 group-data-[state=expanded]:opacity-100'>
          {route.name}
        </span>
      </Link>
    </li>
  );
};
