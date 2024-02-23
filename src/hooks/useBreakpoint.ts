import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

const BREAKPOINTS = {
  sm: '350px', // mobile
  md: '768px', // tablet
  lg: '1024px', // laptop
  xl: '1280px', // desktop
};

export function useBreakpoint(
  breakpoint: keyof typeof BREAKPOINTS,
  direction: 'min' | 'max' = 'min'
) {
  const query = useMemo(
    () => `(${direction}-width: ${BREAKPOINTS[breakpoint]})`,
    [breakpoint, direction]
  );

  return useMediaQuery({ query });
}
