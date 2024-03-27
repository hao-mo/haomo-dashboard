'use client';

import { Loader2Icon } from 'lucide-react';

import { cn } from '@/utils';

export const Loader = ({ className, size = 16 }: WithClassName & { size?: number }) => {
  return (
    <Loader2Icon
      className={cn('animate-spin', className)}
      size={size}
    />
  );
};
