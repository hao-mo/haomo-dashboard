'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import type { Table } from '@tanstack/react-table';
import { EyeIcon, EyeOffIcon, RotateCcwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto h-10'
        >
          {table.getIsAllColumnsVisible() ? (
            <EyeIcon className='size-4' />
          ) : (
            <EyeOffIcon className='size-4' />
          )}
          <span className='ml-2 max-md:hidden'>切換顯示</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[150px]'
        sideOffset={8}
      >
        <DropdownMenuLabel className='flex items-center justify-between'>
          <span>顯示/隱藏</span>
          {!table.getIsAllColumnsVisible() && (
            <RotateCcwIcon
              className='ml-2 size-4 cursor-pointer'
              onClick={() => table.resetColumnVisibility()}
            />
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='cursor-pointer capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
