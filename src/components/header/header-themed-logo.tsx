'use client';

import { useSidebar } from '../sidebar/hooks/useSidebar';
import { ThemedLogo } from '../themed-logo';

export const HeaderThemedLogo = () => {
  const { isTabletView } = useSidebar();

  if (!isTabletView) return null;

  return <ThemedLogo className='max-lg:size-8 lg:hidden' />;
};
