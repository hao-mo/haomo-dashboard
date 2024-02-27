'use client';

import { createContext, useMemo, useRef, useState } from 'react';

import useBetterMediaQuery from '@/hooks/useBreakpoint';

interface SidebarContextType {
  ref: React.RefObject<HTMLElement>;
  isTabletView?: boolean;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLElement>(null);
  const isTabletView = useBetterMediaQuery('lg', 'max');
  const [isVisible, setIsVisible] = useState<boolean>(!isTabletView);

  const contextValue: SidebarContextType = useMemo(
    () => ({ ref, isTabletView, isVisible, setIsVisible }),
    [ref, isTabletView, isVisible, setIsVisible]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};
