'use client';

import Link from 'next/link';

import { userRoutes } from '@/lib/routes';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const UserAccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='circle'
          className='group ml-auto gap-2 p-0'
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
        <DropdownMenuLabel>
          <span className='block truncate'>Username</span>
          <div className='flex items-center justify-between gap-x-2 pt-2'>
            <span className='text-xs text-muted-foreground/80'>Role</span>
            <span className='text-xs font-medium'>Admin</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {userRoutes.map((route) => (
          <DropdownMenuItem key={`user-route-${route.name}`}>
            <Link
              href={route.href}
              className='flex w-full items-center justify-between gap-2 text-xs'
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
