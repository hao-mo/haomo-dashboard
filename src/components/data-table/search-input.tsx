import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/utils';

import { Input } from '../ui/input';

interface DebouncedSearchInputProps
  extends Omit<React.ComponentPropsWithRef<typeof Input>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export function DebouncedSearchInput({
  value: initialValue,
  className,
  onChange,
  debounce = 500,
  ...props
}: DebouncedSearchInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn('max-w-sm', className)}
      startDecorator={
        <Search
          className='text-muted-foreground/80'
          size={20}
        />
      }
    />
  );
}
