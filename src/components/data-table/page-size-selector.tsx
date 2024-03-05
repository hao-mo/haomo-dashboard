import type { Table } from '@tanstack/react-table';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DataTablePageSizeSelectorProps<T> extends WithClassName {
  table: Table<T>;
}

export function DataTablePageSizeSelector<T>({ table }: DataTablePageSizeSelectorProps<T>) {
  return (
    <div className='flex items-center space-x-2'>
      <span className='text-sm'>顯示</span>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className='h-8 w-[70px]'>
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side='top'>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={`${pageSize}`}
            >
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className='text-sm'>筆</span>
    </div>
  );
}
