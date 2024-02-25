import type { Table } from '@tanstack/react-table';

import { cn } from '@/utils';

interface DataTableSelectedRowsInfoProps<T> extends WithClassName {
  table: Table<T>;
}

export default function DataTableSelectedRowsInfo<T>({
  table,
  className,
}: DataTableSelectedRowsInfoProps<T>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div
      className={cn(
        'flex-1 text-sm text-muted-foreground',
        selectedRows === 0 && 'invisible',
        className
      )}
    >
      {selectedRows} of {totalRows} row(s) selected
    </div>
  );
}
