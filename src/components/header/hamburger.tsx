'use client';

import { MenuIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from '../button';
import { useSidebar } from '../sidebar';

export const Hamburger = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isVisible, isTabletView, setIsVisible } = useSidebar();

  useEffect(() => {
    if (!ref.current) return;
    if (isTabletView && !isVisible) {
      ref.current.focus();
    }
  }, [isTabletView, isVisible, ref]);

  if (!isTabletView) return null;

  return (
    <Button
      className='lg:hidden'
      ref={ref}
      size='icon'
      variant='outline'
      onClick={() => setIsVisible(!isVisible)}
    >
      <MenuIcon />
    </Button>
  );
};
