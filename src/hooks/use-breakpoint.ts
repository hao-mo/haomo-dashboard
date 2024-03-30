import { useEffect, useMemo, useState } from 'react';
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

export default function useBetterMediaQuery(
  breakpoint: keyof typeof BREAKPOINTS,
  direction: 'min' | 'max' = 'min'
) {
  const [matches, setMatches] = useState<boolean>();

  const mediaQueryString = useMemo(
    () => `(${direction}-width: ${BREAKPOINTS[breakpoint]})`,
    [breakpoint, direction]
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener); // updated from .addListener
    return () => mediaQueryList.removeEventListener('change', listener); // updated from .removeListener
  }, [mediaQueryString]);

  return matches;
}
