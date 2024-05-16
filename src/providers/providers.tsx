'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';

import { ProjectModal } from '@/components/modals/project-modal';
import { Toaster } from '@/components/ui/sonner';

import { useMount } from '@/hooks/use-mount';
import { useSearchParamsToast } from '@/hooks/use-search-params-toast';

import { queryClient } from '@/lib/react-query';

import { MotionProvider } from '@/providers/motion-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  useSearchParamsToast();
  const isMounted = useMount();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider
        attribute='class'
        enableSystem
      >
        <MotionProvider>
          {children}
          <Toaster />
          {isMounted && <ProjectModal />}
        </MotionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
