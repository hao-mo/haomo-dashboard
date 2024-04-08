import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/utils';

import { FormControl } from './form';

export function DatePicker({
  className,
  selected,
  onSelect,
  required = false,
  withForm = false,
  placeholder = 'Pick a date',
  ...props
}: {
  selected: Date;
  onSelect: SelectSingleEventHandler;
  required?: boolean;
  withForm?: boolean;
  placeholder?: string;
} & WithClassName &
  Omit<React.ComponentProps<typeof Calendar>, 'onSelect' | 'selected' | 'mode'>) {
  const renderButton = () => (
    <Button
      variant={'outline'}
      className={cn(
        'w-[280px] justify-start text-left font-normal',
        !selected && 'text-muted-foreground',
        className
      )}
    >
      <CalendarIcon className='mr-2 size-4' />
      {selected ? format(selected, 'PPP') : <span>{placeholder}</span>}
    </Button>
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        {withForm ? <FormControl>{renderButton()}</FormControl> : renderButton()}
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={selected}
          onSelect={onSelect}
          required={required}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
