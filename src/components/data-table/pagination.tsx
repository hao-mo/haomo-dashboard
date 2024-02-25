import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/button';

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  return (
    <div className='flex items-center justify-center gap-2 md:gap-4'>
      <span className='text-sm max-md:hidden'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden size-8 p-0 lg:flex'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to first page</span>
          <ChevronsLeft className='size-4' />
        </Button>
        <Button
          variant='outline'
          className='size-8 p-0'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeft className='size-4' />
        </Button>
        <Button
          variant='outline'
          className='size-8 p-0'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRight className='size-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden size-8 p-0 lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to last page</span>
          <ChevronsRight className='size-4' />
        </Button>
      </div>
    </div>
  );
}
