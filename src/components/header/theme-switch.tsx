'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useMount } from '@/hooks/useMount';

import { Button } from '../button';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isMount = useMount();

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!isMount) return null;

  return (
    <Button
      variant='outline'
      size='circle'
      onClick={handleSwitchTheme}
    >
      {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};
