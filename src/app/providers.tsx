'use client';

// import { CustomCursorProvider } from '@/components/custom-cursor';
import { ThemeProvider } from 'next-themes';

import { MotionProvider } from '@/components/motion-provider';
import { SidebarProvider } from '@/components/sidebar';
import { useMount } from '@/hooks/useMount';
// import { SmoothScroll } from '@/components/smooth-scroll';
// import { ThemeProvider } from '@/components/theme-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  const isMount = useMount();

  if (!isMount) return 'loading...';

  return (
    <ThemeProvider attribute='class'>
      <MotionProvider>
        <SidebarProvider>
          {/* <SmoothScroll>
          <CustomCursorProvider> */}
          {children}
          {/* </CustomCursorProvider>
        </SmoothScroll> */}
        </SidebarProvider>
      </MotionProvider>
    </ThemeProvider>
  );
};
