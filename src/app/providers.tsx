'use client';

// import { CustomCursorProvider } from '@/components/custom-cursor';
import { ThemeProvider } from 'next-themes';

import { MotionProvider } from '@/components/motion-provider';
// import { SmoothScroll } from '@/components/smooth-scroll';
// import { ThemeProvider } from '@/components/theme-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem
    >
      <MotionProvider>
        {/* <SmoothScroll>
          <CustomCursorProvider> */}
        {children}
        {/* </CustomCursorProvider>
        </SmoothScroll> */}
      </MotionProvider>
    </ThemeProvider>
  );
};
