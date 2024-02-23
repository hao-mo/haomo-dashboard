'use client';

import { useSidebar } from '@/components/sidebar';

import { ThemedLogo } from '../themed-logo';

export const HeaderThemedLogo = () => {
  const { isTabletView } = useSidebar();

  if (!isTabletView) return null;

  return <ThemedLogo className='lg:hidden' />;
};
