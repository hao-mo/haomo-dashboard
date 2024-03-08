'use client';

import useHover from '@react-hook/hover';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import Logo from '@/public/icon.ico';

import { MainSidebarNav } from './main-sidebar-nav';
import { UserSidebarMenu } from './user-sidebar-menu';

export const Sidebar = ({ username, email }: { username: string; email: string }) => {
  const ref = useRef<HTMLElement>(null);
  const isHover = useHover(ref);

  return (
    <aside
      ref={ref}
      className='flex h-full w-14 flex-col'
    >
      <nav
        className='group z-10 flex h-full w-14 flex-col justify-between overflow-hidden bg-background pb-4 transition-width duration-200 no-scrollbar data-[state=expanded]:w-52 data-[state=expanded]:shadow-xl'
        data-state={isHover ? 'expanded' : 'collapsed'}
      >
        <ul className='flex flex-col justify-start gap-y-1 px-2'>
          <li className='relative mx-2'>
            <Link
              href='/'
              className='flex h-20 w-full shrink-0 items-center rounded'
            >
              <Image
                src={Logo}
                className='absolute h-20 w-6 object-contain object-center'
                alt='Logo'
                sizes='2.5rem'
                priority
              />
            </Link>
          </li>
          <MainSidebarNav />
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
