import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';

import { useOpen } from '@/hooks/use-open';

import type { Option } from '@/lib/types';

import { cn } from '@/utils';

import { Badge } from './badge';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface MultiSelectContextType {
  options: Option[];
  selected: Option[];
  handleUnselect: (item: string) => void;
  handleOnItemSelect: (item: string) => void;
}

const MultiSelectContext = createContext<MultiSelectContextType | undefined>(undefined);

export const useMultiSelectContext = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelectContext must be used within a MultiSelectProvider');
  }
  return context;
};

interface MultiSelectProviderProps extends PropsWithChildren {
  options: Option[];
  selected: Option[];
  handleUnselect: (item: string) => void;
  handleOnItemSelect: (item: string) => void;
}

export const MultiSelectProvider: React.FC<MultiSelectProviderProps> = ({
  options,
  selected,
  handleUnselect,
  handleOnItemSelect,
  children,
}) => {
  const contextValue = useMemo(
    () => ({ options, selected, handleUnselect, handleOnItemSelect }),
    [options, selected, handleUnselect, handleOnItemSelect]
  );
  return <MultiSelectContext.Provider value={contextValue}>{children}</MultiSelectContext.Provider>;
};

interface MultiSelectProps extends WithClassName {
  options: Option[];
  selected: Option[];
  onValueChange: (value: Option[]) => void;
  dropdownClassName?: string;
  emptyAction?: React.ReactNode;
  additionalAction?: (option: Option) => React.ReactNode;
}

export const MultiSelect = ({
  options,
  selected,
  className,
  dropdownClassName,
  onValueChange,
  emptyAction,
  additionalAction,
}: MultiSelectProps) => {
  const { isOpen, onOpenChange } = useOpen();

  const handleUnselect = (targetItem: string) => {
    onValueChange(selected.filter((item) => item.value !== targetItem));
  };

  const handleOnItemSelect = (targetItem: string) => {
    if (selected.some((item) => item.value === targetItem)) {
      onValueChange(selected.filter((item) => item.value !== targetItem));
    } else {
      onValueChange([...selected, options.find((option) => option.value === targetItem)!]);
    }
  };

  return (
    <MultiSelectContext.Provider
      value={{
        options,
        selected,
        handleUnselect,
        handleOnItemSelect,
      }}
    >
      <Popover
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn('group relative h-fit min-h-10 w-full justify-between', className)}
            onClick={() => onOpenChange(!isOpen)}
          >
            <div className='flex flex-wrap gap-1'>
              {selected.map((item) => (
                <Badge
                  key={item.value}
                  variant='secondary'
                  className='group-hover:bg-white/80 '
                  onClick={() => handleUnselect(item.value)}
                >
                  {item.name}
                  <div
                    className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item.value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item.value)}
                  >
                    <XIcon className='size-3 text-muted-foreground hover:text-foreground' />
                  </div>
                </Badge>
              ))}
            </div>
            <ChevronsUpDownIcon className='size-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='relative w-[var(--radix-popover-trigger-width)] p-0'>
          <Command className={dropdownClassName}>
            <CommandInput
              className='text-xs'
              placeholder='搜尋...'
            />
            <CommandEmpty className='grid place-items-center p-4'>
              {emptyAction ? emptyAction : <p className='text-xs'>沒有相符的結果</p>}
            </CommandEmpty>
            <CommandGroup className='max-h-64 overflow-auto'>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleOnItemSelect}
                  className='relative cursor-pointer text-xs'
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.some((item) => item.value === option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <span className='flex-1'>{option.name}</span>
                  {additionalAction && <div className='z-1 ml-2'>{additionalAction(option)}</div>}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </MultiSelectContext.Provider>
  );
};
