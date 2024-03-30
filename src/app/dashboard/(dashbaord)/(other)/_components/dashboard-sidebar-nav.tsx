'use client';

import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/utils';
import { handleFormRequest } from '@/utils/auth-helpers/client';
import { signOut } from '@/utils/auth-helpers/server';

export const DashboardSidebarNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = useMemo(
    () => [
      {
        title: 'Project',
        routes: [
          {
            label: 'All Projects',
            href: '/dashboard/projects',
          },
        ],
      },
      {
        title: 'Account',
        routes: [
          {
            label: 'Preferences',
            href: '/dashboard/account/preferences',
          },
          {
            label: 'Settings',
            href: '/dashboard/account/settings',
          },
        ],
      },
      {
        title: 'Access',
        routes: [{ label: 'Users', href: '/dashboard/access/users' }],
      },
    ],
    [pathname]
  );

  return (
    <>
      {routes.map((route) => (
        <li
          key={`sidebar-nav-group-${route.title}`}
          className='relative border-b border-border p-4 lg:px-6'
        >
          <h3 className='mb-2 text-xs font-semibold'>{route.title}</h3>
          <ul>
            {route.routes.map((subRoute) => (
              <li
                key={`sidebar-nav-item-${subRoute.href}`}
                className='relative p-2'
              >
                <Link
                  href={subRoute.href}
                  className={cn(
                    'group/item relative flex w-fit items-center rounded text-xs text-foreground transition-all duration-200 hover:text-primary group-data-[state=expanded]:w-full ',
                    pathname === subRoute.href && 'text-primary'
                  )}
                >
                  <span>{subRoute.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
      <form
        action={(formData) => handleFormRequest(formData, signOut, router)}
        className=' relative border-b border-border p-4 lg:px-6'
      >
        <input
          type='hidden'
          name='pathName'
          value={pathname}
        />
        <div className='group inline-flex items-center text-xs'>
          <LogOutIcon
            size={16}
            className='mr-2 text-foreground group-hocus:text-primary'
          />
          <button
            type='submit'
            className='text-left text-xs group-hocus:text-primary'
          >
            Sign out
          </button>
        </div>
      </form>
    </>
  );
};
