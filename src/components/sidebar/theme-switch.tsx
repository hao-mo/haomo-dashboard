'use client';

import { useTheme } from 'next-themes';

import { useMount } from '@/hooks/useMount';

import { MenubarRadioGroup, MenubarRadioItem } from '../ui/menubar';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isMount = useMount();

  const handleSwitchTheme = (value: string) => {
    if (value === theme) return;
    setTheme(value);
  };

  if (!isMount) return null;

  return (
    <MenubarRadioGroup
      value={theme}
      onValueChange={handleSwitchTheme}
    >
      <MenubarRadioItem value='system'>System</MenubarRadioItem>
      <MenubarRadioItem value='light'>Light</MenubarRadioItem>
      <MenubarRadioItem value='dark'>Dark</MenubarRadioItem>
    </MenubarRadioGroup>
  );
};
