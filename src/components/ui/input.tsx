import * as React from 'react';

import { cn } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  side?: LeftOrRight;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, side = 'left', ...props }, ref) => {
    return (
      <div
        className={cn(
          'group flex h-10 w-full items-center gap-x-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          side === 'right' && 'flex-row-reverse',
          className
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            'w-full bg-inherit file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
