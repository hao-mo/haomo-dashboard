'use client';

import { ThemeProvider } from 'next-themes';

import { ProjectModal } from '@/components/modals/project-modal';
import { Toaster } from '@/components/ui/sonner';

import { useMount } from '@/hooks/use-mount';
import { useSearchParamsToast } from '@/hooks/use-search-params-toast';

import { MotionProvider } from '@/providers/motion-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  useSearchParamsToast();
  const isMounted = useMount();

  return (
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
  );
};
