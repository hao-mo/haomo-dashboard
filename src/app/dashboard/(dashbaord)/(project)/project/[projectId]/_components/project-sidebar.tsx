'use client';

import useHover from '@react-hook/hover';
import { useRef } from 'react';

import { ProjectSidebarNav } from './project-sidebar-nav';
import { UserSidebarMenu } from './user-sidebar-menu';

export const ProjectSidebar = ({ username, email }: { username: string; email: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isHover = useHover(ref);

  return (
    <aside
      ref={ref}
      className='flex h-full w-14 flex-col'
    >
      <nav
        className='group z-10 flex h-full w-14 flex-col justify-between overflow-hidden border-r border-border bg-background py-4 transition-width duration-200 no-scrollbar data-[state=expanded]:w-52 data-[state=expanded]:shadow-xl'
        data-state={isHover ? 'expanded' : 'collapsed'}
      >
        <ul className='flex flex-col justify-start gap-y-1 px-2'>
          <ProjectSidebarNav />
        </ul>
        <ul className='flex flex-col gap-y-1 px-2'>
          <UserSidebarMenu
            username={username}
            email={email}
          />
        </ul>
      </nav>
    </aside>
  );
};
