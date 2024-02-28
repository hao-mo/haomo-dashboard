'use client';

import { AnimatePresence, m } from 'framer-motion';
import { ChevronsUpDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import AvatarFallbackImage from '@/public/avatar.webp';

import { userRoutes } from '@/lib/routes';
import { fadeIn } from '@/lib/transitions';
import { cn } from '@/utils';

import { useSidebar } from './sidebar/hooks/useSidebar';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { MotionTypography } from './ui/typography';

const MotionButton = m(Button);

export const UserAccountDropdown = () => {
  const { isVisible, isTabletView } = useSidebar();

  const collapsed = !isVisible && !isTabletView;

  return (
    <TooltipProvider
      delayDuration={500}
      disableHoverableContent
    >
      <div className='mb-4 mt-auto flex items-center justify-center px-4'>
        <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <MotionButton
                  variant='ghost'
                  size={collapsed ? 'circle' : 'default'}
                  className='group relative h-fit w-full gap-2 text-left'
                  initial={false}
                  animate={collapsed ? { padding: 0 } : { padding: '0.5rem 1rem' }}
                  transition={{ duration: 0.2, ease: 'easeIn' }}
                >
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex min-w-0 items-center justify-between space-x-3'>
                      <Avatar className='size-10'>
                        <AvatarImage
                          className='h-auto object-cover object-center blur-sm transition-all duration-500 ease-in-out'
                          src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                          loading='lazy'
                          alt='avatar'
                          onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                        />
                        <AvatarFallback asChild>
                          <Image
                            className='h-auto object-cover object-center'
                            src={AvatarFallbackImage}
                            alt='avatar'
                            loading='lazy'
                          />
                        </AvatarFallback>
                      </Avatar>
                      <AnimatePresence
                        mode='wait'
                        initial={false}
                      >
                        {collapsed ? null : (
                          <MotionTypography
                            className={cn(
                              'flex min-w-0 flex-1 select-none flex-col',
                              collapsed && 'hidden'
                            )}
                            initial='hidden'
                            animate='show'
                            exit='hidden'
                            variants={fadeIn}
                            transition={{ duration: 0.2, ease: 'easeIn' }}
                          >
                            <span className='truncate text-xs'>Jessy Schwarz</span>
                            <span className='truncate text-xs text-muted-foreground'>
                              @jessyschwarz
                            </span>
                          </MotionTypography>
                        )}
                      </AnimatePresence>
                    </div>
                    <ChevronsUpDownIcon
                      className={cn(
                        'text-gray-400 size-5 shrink-0 text-muted-foreground/80 group-hover:text-muted-foreground',
                        collapsed && 'hidden'
                      )}
                      aria-hidden='true'
                    />
                  </div>
                </MotionButton>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <DropdownMenuContent
              align={collapsed ? 'end' : 'center'}
              side={collapsed ? 'right' : 'top'}
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
          <TooltipContent
            align='center'
            side='right'
            sideOffset={8}
          >
            使用者選單
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export const MobileUserAccountDropdown = () => {
  return (
    <TooltipProvider
      delayDuration={500}
      disableHoverableContent
    >
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='circle'
                className='group ml-auto gap-2 p-0 lg:hidden'
              >
                <Avatar className='size-9'>
                  <AvatarImage
                    className='h-auto object-cover object-center blur-sm transition-all duration-500 ease-in-out'
                    src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                    loading='lazy'
                    alt='avatar'
                    onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                  />
                  <AvatarFallback asChild>
                    <Image
                      className='h-auto object-cover object-center'
                      src={AvatarFallbackImage}
                      alt='avatar'
                      loading='lazy'
                    />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={8}
            className='min-w-60 max-w-60'
          >
            <DropdownMenuLabel className='flex items-center justify-between space-x-3'>
              <Avatar className='size-8'>
                <AvatarImage
                  className='h-auto object-cover object-center blur-sm transition-all duration-500 ease-in-out'
                  src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                  loading='lazy'
                  alt='avatar'
                  onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                />
                <AvatarFallback asChild>
                  <Image
                    className='h-auto object-cover object-center'
                    src={AvatarFallbackImage}
                    alt='avatar'
                    loading='lazy'
                  />
                </AvatarFallback>
              </Avatar>
              <span className='flex min-w-0 flex-1 select-none flex-col'>
                <span className='truncate text-xs'>Jessy Schwarz</span>
                <span className='truncate text-xs text-muted-foreground'>@jessyschwarz</span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <UserDropdownList />
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent
          align='end'
          side='bottom'
          sideOffset={8}
        >
          使用者選單
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
