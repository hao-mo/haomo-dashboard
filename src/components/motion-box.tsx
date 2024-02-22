'use client';

import { type HTMLMotionProps, m } from 'framer-motion';
import { forwardRef } from 'react';

interface MotionBoxProps extends HTMLMotionProps<'div'> {}

export const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>((props, ref) => {
  return (
    <m.div
      ref={ref}
      {...props}
    />
  );
});

MotionBox.displayName = 'MotionBox';
