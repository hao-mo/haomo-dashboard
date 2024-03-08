import { CircleUserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { userRoutes } from '@/lib/routes';

import { handleFormRequest } from '@/utils/auth-helpers/client';
import { signOut } from '@/utils/auth-helpers/server';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar';

import { ThemeSwitch } from './theme-switch';

const AccountName = ({ username }: { username?: string }) => {
  return (
    <span
      title={username}
      className='w-full truncate text-left text-xs text-foreground'
    >
      {username}
    </span>
  );
};

const AccountEmail = ({ email }: { email?: string }) => {
  return (
    <span
      title={email}
      className='w-full truncate text-left text-2xs text-muted-foreground'
    >
      {email}
    </span>
  );
};

export const UserSidebarMenu = ({ username, email }: { username: string; email: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menubar
      className='relative mt-3 flex w-full items-center justify-center space-x-2 rounded-md border-none p-0 text-center text-xs text-foreground shadow-none outline-none outline-0 transition-all duration-200 ease-out data-[state=open]:bg-accent'
      asChild
    >
      <Button variant='ghost'>
        <MenubarMenu>
          <MenubarTrigger
            asChild
            className='relative float-start size-full cursor-pointer truncate p-0'
          >
            <div className='relative flex size-full items-center justify-center'>
              <Avatar
                asChild
                className='absolute left-2 flex size-6 items-center justify-center rounded-full bg-foreground'
              >
                <figure>
                  <AvatarImage
                    className='h-auto object-cover object-center '
                    src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                    loading='lazy'
                    alt='avatar'
                  />
                  <AvatarFallback>
                    <CircleUserRoundIcon size={18} />
                  </AvatarFallback>
                </figure>
              </Avatar>
              <span className='absolute left-7 flex w-40 flex-col items-start truncate text-sm font-normal transition-all group-data-[state=expanded]:left-10 group-data-[state=collapsed]:opacity-0 group-data-[state=expanded]:opacity-100'>
                <AccountName username={username} />
                <AccountEmail email={email} />
              </span>
            </div>
          </MenubarTrigger>
          <MenubarContent
            alignOffset={1}
            align='start'
            side='top'
            sideOffset={8}
            className='w-64 min-w-32 max-w-full p-1'
          >
            <div className='flex flex-col gap-0 px-2 py-1 text-sm'>
              <AccountName username={username} />
              <AccountEmail email={email} />
            </div>
            <MenubarSeparator />
            {userRoutes.map((route) => (
              <MenubarItem key={`user-route-${route.name}`}>
                <Link
                  href={route.href}
                  className='flex w-full items-center gap-2 px-2 py-1 text-left text-xs'
                >
                  {route.icon}
                  {route.name}
                </Link>
              </MenubarItem>
            ))}
            <MenubarSeparator />
            <MenubarLabel className='text-xs'>Theme</MenubarLabel>
            <ThemeSwitch />
            <MenubarSeparator />
            <form
              action={(formData) => handleFormRequest(formData, signOut, router)}
              className='w-full px-2 py-1'
            >
              <input
                type='hidden'
                name='pathName'
                value={pathname}
              />
              <button
                type='submit'
                className='w-full cursor-pointer text-left text-xs'
              >
                Sign out
              </button>
            </form>
          </MenubarContent>
        </MenubarMenu>
      </Button>
    </Menubar>
  );
};
