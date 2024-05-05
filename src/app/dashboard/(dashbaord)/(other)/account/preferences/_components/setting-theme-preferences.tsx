'use client';

import { CheckIcon, ChevronsUpDownIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Fragment, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useMount } from '@/hooks/use-mount';

import { cn } from '@/utils';

import {
  UserSettingArea,
  UserSettingGroup,
  UserSettingGroupContent,
  UserSettingGroupLabel,
  UserSettingHeader,
} from './user-setting';

export const SettingThemePreferences = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const isMount = useMount();

  const themes = [
    {
      label: 'System',
      value: 'system',
    },
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ];

  const handleSwitchTheme = useCallback(
    (value: string) => {
      if (value === theme) return;
      setTheme(value);
    },
    [theme, setTheme]
  );

  return (
    <div className='relative'>
      <UserSettingHeader
        title='Theme'
        description='Choose a theme preference'
      />
      <UserSettingArea>
        <UserSettingGroup>
          <UserSettingGroupLabel title='Interface theme' />
          <UserSettingGroupContent>
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  aria-expanded={open}
                  aria-label='選擇一個主題'
                  className={cn('w-[200px] justify-between px-3 py-2 capitalize')}
                >
                  {isMount &&
                    (theme === 'system' ? (
                      systemTheme === 'dark' ? (
                        <MoonIcon className='mr-2 size-4' />
                      ) : (
                        <SunIcon className='mr-2 size-4' />
                      )
                    ) : theme === 'light' ? (
                      <SunIcon className='mr-2 size-4' />
                    ) : (
                      <MoonIcon className='mr-2 size-4' />
                    ))}

                  {isMount ? theme : null}
                  <ChevronsUpDownIcon className='ml-auto size-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {themes.map((themeItem) => (
                        <Fragment key={themeItem.value}>
                          <CommandItem
                            onSelect={() => handleSwitchTheme(themeItem.value)}
                            className='cursor-pointer text-xs'
                          >
                            {themeItem.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4 text-primary',
                                theme === themeItem.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        </Fragment>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </UserSettingGroupContent>
        </UserSettingGroup>
      </UserSettingArea>
    </div>
  );
};
