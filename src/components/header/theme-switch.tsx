'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useMount } from '@/hooks/useMount';

import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isMount = useMount();

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!isMount) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='circle'
            onClick={handleSwitchTheme}
          >
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className='capitalize'
          side='bottom'
          sideOffset={8}
        >
          {theme === 'light' ? 'dark' : 'light'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
