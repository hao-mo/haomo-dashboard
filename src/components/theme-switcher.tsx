'use client';

import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
};
