'use client';

import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

import { Toaster } from '@/components/ui/toaster';

import { MotionProvider } from '@/providers/motion-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem
    >
      <MotionProvider>
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </MotionProvider>
    </ThemeProvider>
  );
};
