import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import { useSidebar } from './sidebar';

export function useSidebarHandlers() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { isTabletView, isVisible, setIsVisible } = useSidebar();

  const handleClick = useCallback(
    ({ target }: MouseEvent) => {
      if (!ref.current) return;
      if (!isVisible || !isTabletView || ref.current.contains(target as Node)) return;
      setIsVisible(false);
    },
    [isVisible, isTabletView, ref]
  );

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!isVisible || !isTabletView || key !== 'Escape') return;
      setIsVisible(false);
    },
    [isVisible, isTabletView]
  );

  useEffect(() => {
    if (isTabletView) setIsVisible(false);
    else setIsVisible(true);
  }, [isTabletView]);

  useEffect(() => {
    if (isTabletView) setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  return { ref, isTabletView, isVisible, setIsVisible };
}
