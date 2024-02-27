'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import AvatarFallbackImage from '@/public/avatar.webp';

import { userRoutes } from '@/lib/routes';

import { useSidebar } from './sidebar/hooks/useSidebar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const UserAccountDropdown = () => {
  const { ref } = useSidebar();
  return (
    <div className='mt-4 px-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='group relative h-fit w-full gap-2 text-left'
          >
            <div className='flex w-full items-center justify-between'>
              <div className='flex min-w-0 items-center justify-between space-x-3'>
                <Avatar className='size-10'>
                  <AvatarImage
                    src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                    alt='avatar'
                  />
                  <AvatarFallback>
                    <Image
                      src={AvatarFallbackImage}
                      alt='avatar'
                    />
                  </AvatarFallback>
                </Avatar>
                <span className='flex min-w-0 flex-1 flex-col'>
                  <span className='truncate text-xs'>Jessy Schwarz</span>
                  <span className='text-gray-500 truncate text-xs'>@jessyschwarz</span>
                </span>
              </div>
              <ChevronsUpDownIcon
                className='text-gray-400 group-hover:text-gray-500 size-5 shrink-0'
                aria-hidden='true'
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          container={ref.current}
          align='center'
          sideOffset={8}
          className='min-w-60 max-w-full'
        >
          {/* <DropdownMenuLabel>
          <span className='block truncate'>Username</span>
          <div className='flex items-center justify-between gap-x-2 pt-2'>
            <span className='text-xs text-muted-foreground/80'>Role</span>
            <span className='text-xs font-medium'>Admin</span>
          </div>
        </DropdownMenuLabel> */}

          <UserDropdownList />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const MobileUserAccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='circle'
          className='group ml-auto gap-2 p-0 lg:hidden'
        >
          <Avatar className='size-8'>
            <AvatarImage
              src='/avatar.webp'
              alt='avatar'
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={8}
        className='min-w-60 max-w-60'
      >
        <UserDropdownList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdownList = () => {
  return (
    <>
      {userRoutes.map((route) => (
        <DropdownMenuItem key={`user-route-${route.name}`}>
          <Link
            href={route.href}
            className='w-full text-left text-xs'
          >
            {route.name}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link
          href='/logout'
          className='w-full text-left text-xs'
        >
          Sign out
        </Link>
      </DropdownMenuItem>
    </>
  );
};
