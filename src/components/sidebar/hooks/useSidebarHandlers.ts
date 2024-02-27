import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useSidebar } from './useSidebar';

export function useSidebarHandlers() {
  const pathname = usePathname();
  const { ref, isTabletView, isVisible, setIsVisible } = useSidebar();

  const getAnimationState = () => {
    if (isVisible) {
      return 'expanded';
    } else if (isTabletView) {
      return 'hidden';
    } else {
      return 'collapsed';
    }
  };

  const animationState = getAnimationState();

  const handleClick = useCallback(
    ({ target }: MouseEvent) => {
      if (target === document.getElementById('sidebar-overlay')) setIsVisible(false);
    },
    [isVisible, isTabletView]
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

  return { ref, isTabletView, isVisible, animationState, setIsVisible };
}
