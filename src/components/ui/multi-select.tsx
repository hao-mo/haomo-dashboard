import { CommandLoading } from 'cmdk';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';

import { useOpen } from '@/hooks/use-open';

import type { Option } from '@/lib/types';

import { cn } from '@/utils';

import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface MultiSelectProps extends WithClassName {
  options: Option[];
  selected: Option[];
  onValueChange: (value: Option[]) => void;
  loading?: boolean;
  loadingAction?: React.ReactNode;
  emptyAction?: React.ReactNode;
  footerAction?: React.ReactNode;
  additionalAction?: (option: Option) => React.ReactNode;
}

export const MultiSelect = ({
  options,
  selected,
  className,
  onValueChange,
  loading,
  loadingAction,
  emptyAction,
  footerAction,
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
    <Popover
      open={isOpen}
      onOpenChange={onOpenChange}
      modal
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'group relative h-fit min-h-10 w-full justify-between font-normal',
            className
          )}
          onClick={() => onOpenChange(!isOpen)}
        >
          {selected.length === 0 ? (
            '請選擇...'
          ) : (
            <div className='flex flex-wrap gap-1'>
              {selected.map((item) => (
                <Badge
                  key={item.value}
                  variant='secondary'
                  className='group-hover:bg-white/80 '
                >
                  {item.name}
                  <span
                    role='button'
                    tabIndex={0}
                    className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item.value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(item.value);
                    }}
                  >
                    <XIcon className='size-3 text-muted-foreground hover:text-foreground' />
                  </span>
                </Badge>
              ))}
            </div>
          )}
          <ChevronsUpDownIcon className='size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='relative w-[var(--radix-popover-trigger-width)] p-0'>
        <Command>
          <CommandInput
            className='text-xs'
            placeholder='搜尋...'
          />
          <CommandEmpty className='grid place-items-center p-4'>
            {emptyAction || <p className='text-xs'>沒有相符的結果</p>}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.name]}
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
            {loading && (
              <CommandLoading className='grid place-items-center p-2'>
                {loadingAction || <p className='text-xs'>載入中...</p>}
              </CommandLoading>
            )}
            {footerAction}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
