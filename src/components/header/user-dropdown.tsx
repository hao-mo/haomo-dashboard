import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

import { userRoutes } from '@/lib/routes';

import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';

export const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='group'
      >
        <Button
          variant='outline'
          className=' ml-auto gap-2'
        >
          <Avatar className='size-5'>
            <AvatarImage
              src='/avatar.webp'
              alt='avatar'
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className='select-none'>Avatar</span>
          <ChevronDownIcon
            size={16}
            className='transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={5}
      >
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
