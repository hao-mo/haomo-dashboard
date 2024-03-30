'use client';

import { FileSpreadsheet, LayoutDashboardIcon, PieChart, Sheet, StickyNote } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/utils';

export const ProjectSidebarNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = useMemo(
    () => [
      {
        label: 'Overview',
        href: `/dashboard/project/${params.projectId}`,
        icon: <LayoutDashboardIcon size={20} />,
        active: pathname === `/dashboard/project/${params.projectId}`,
      },
      {
        label: 'Blogs',
        href: `/dashboard/project/${params.projectId}/blogs`,
        icon: <StickyNote size={20} />,
        active: pathname === `/dashboard/project/${params.projectId}/blogs`,
      },
      {
        label: 'Reports',
        href: `/dashboard/project/${params.projectId}/reports`,
        icon: <PieChart size={20} />,
        active: pathname === `/dashboard/project/${params.projectId}/reports`,
      },
      {
        label: 'Tables',
        href: `/dashboard/project/${params.projectId}/tables`,
        icon: <Sheet size={20} />,
        active: pathname === `/dashboard/project/${params.projectId}/tables`,
      },
      {
        label: 'Forms',
        href: `/dashboard/project/${params.projectId}/forms`,
        icon: <FileSpreadsheet size={20} />,
        active: pathname === `/dashboard/project/${params.projectId}/forms`,
      },
    ],
    [params, pathname]
  );

  return (
    <>
      {routes.map((route) => (
        <li
          className='relative'
          key={`main-sidebar-nav-item-${route.href}`}
        >
          <Link
            href={route.href}
            className={cn(
              'group/item relative flex h-10 w-10 items-center rounded text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground group-data-[state=expanded]:w-full',
              route.active && 'text-primary'
            )}
            aria-current={route.active}
          >
            {route.icon && (
              <span className='absolute left-0 top-0 flex size-10 items-center justify-center rounded'>
                {route.icon}
              </span>
            )}
            <span className='absolute left-12 min-w-32 -translate-x-7 text-xs opacity-0 transition-[transform,opacity] duration-200 group-data-[state=expanded]:-translate-x-0 group-data-[state=expanded]:opacity-100'>
              {route.label}
            </span>
          </Link>
        </li>
      ))}
    </>
  );
};
