import type { MotionValue } from 'framer-motion';
import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';

const inactiveShadow = '0px 2px 8px 0px rgba(0,0,0,0.1)';

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);
  const isActive = useRef<boolean>(false);

  useMotionValueEvent(value, 'change', (latest) => {
    const wasActive = isActive.current;
    if (latest !== 0) {
      isActive.current = true;
      if (isActive.current !== wasActive) {
        animate(boxShadow, '0px 4px 8px 0px rgba(0,0,0,0.1)');
      }
    } else {
      isActive.current = false;
      if (isActive.current !== wasActive) {
        animate(boxShadow, inactiveShadow);
      }
    }
  });

  return boxShadow;
}
