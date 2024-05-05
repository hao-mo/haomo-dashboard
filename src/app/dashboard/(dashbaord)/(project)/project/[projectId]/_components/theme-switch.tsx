'use client';

import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import { MenubarRadioGroup, MenubarRadioItem } from '@/components/ui/menubar';

import { useMount } from '@/hooks/use-mount';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isMount = useMount();

  const handleSwitchTheme = useCallback(
    (value: string) => {
      if (value === theme) return;
      setTheme(value);
    },
    [theme, setTheme]
  );

  if (!isMount) return null;

  return (
    <MenubarRadioGroup
      value={theme}
      onValueChange={handleSwitchTheme}
    >
      <MenubarRadioItem
        className='py-2'
        value='system'
      >
        System
      </MenubarRadioItem>
      <MenubarRadioItem
        className='py-2'
        value='light'
      >
        Light
      </MenubarRadioItem>
      <MenubarRadioItem
        className='py-2'
        value='dark'
      >
        Dark
      </MenubarRadioItem>
    </MenubarRadioGroup>
  );
};
