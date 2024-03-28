'use client';

import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { useSearchParamsToast } from '@/hooks/use-search-params-toast';

import { MotionProvider } from '@/providers/motion-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  useSearchParamsToast();
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
