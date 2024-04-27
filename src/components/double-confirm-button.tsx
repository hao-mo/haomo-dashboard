import { m } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { cn } from '@/utils';

import { Button } from './ui/button';

interface DoubleConfirmButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  confirmText: string;
  confirmClassName?: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DoubleConfirmButton = ({
  className,
  children,
  confirmText,
  confirmClassName,
  onConfirm,
  ...props
}: DoubleConfirmButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isConfirming) {
      onConfirm(e);
    } else {
      setIsConfirming(true);
    }
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!hover && isConfirming) {
      timeoutId = setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [hover, isConfirming]);

  return (
    <Button
      className={cn('w-full overflow-hidden', className, isConfirming && confirmClassName)}
      type='button'
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}

      <m.span
        className='text-xs'
        animate={isConfirming ? 'show' : 'hidden'}
        variants={{
          hidden: { opacity: 0, x: -10, width: 0, marginLeft: 0 },
          show: { opacity: 1, x: 0, width: 'auto', marginLeft: 4 },
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {confirmText}
      </m.span>
    </Button>
  );
};
