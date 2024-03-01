'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils';

type Option = { value: string; name: string };

interface ComboboxProps {
  name: string;
  value: string;
  options: Option[];
  searchBy?: keyof Option | 'both';
  placeholder?: string;
  searchPlaceholder?: string;
  emptyContent?: React.ReactNode;
}

export const Combobox = ({
  name,
  value,
  options,
  searchBy = 'both',
  placeholder = 'Select',
  searchPlaceholder = 'Search...',
  emptyContent = 'No results found',
}: ComboboxProps) => {
  const { setValue } = useFormContext();

  const selectedCountryName = useMemo(() => {
    return options.find((country) => country.value === value)?.name;
  }, [value, options]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn('w-full justify-between', !value && 'text-muted-foreground')}
          >
            {value ? selectedCountryName : placeholder}
            <ChevronsUpDownIcon className='ml-2 size-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='relative p-0'>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className='h-9'
          />
          <CommandEmpty>{emptyContent}</CommandEmpty>
          <CommandGroup className='max-h-100 overflow-y-auto'>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={searchBy === 'both' ? `${option.name} ${option.value}` : option[searchBy]}
                onSelect={() => {
                  setValue(name, option.value);
                }}
              >
                {option.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    option.value === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
