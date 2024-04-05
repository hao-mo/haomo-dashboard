'use client';

import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { AddButton } from '@/components/add-button';
import {
  DataTablePageSizeSelector,
  DataTablePagination,
  DataTableViewOptions,
} from '@/components/data-table';
import { DebouncedSearchInput } from '@/components/data-table/search-input';
import { DeleteModal } from '@/components/modals/delete-modal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { wait } from '@/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const getCommonPinningStyles = <T,>(column: Column<T>): CSSProperties => {
  const isCheckbox = column.id === 'select';

  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  const getBoxShadow = () => {
    if (isLastLeftPinnedColumn || isCheckbox) {
      return '-2px 0 4px -4px gray inset';
    }
    if (isFirstRightPinnedColumn) {
      return '2px 0 4px -4px gray inset';
    }
    return undefined;
  };

  return {
    boxShadow: getBoxShadow(),
    left: isPinned === 'left' || isCheckbox ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned || isCheckbox ? 0.95 : 1,
    position: isPinned || isCheckbox ? 'sticky' : 'relative',
    width: 'fit-content',
    zIndex: isPinned || isCheckbox ? 1 : 0,
  };
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onConfirm = async () => {
    try {
      setLoading(true);
      await wait(3000);
      console.log('rows', table.getSelectedRowModel().rows);
      toast.success('刪除成功');

      router.refresh();
    } catch (error) {
      toast.error('刪除失敗');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className='relative'>
      <div className='flex items-center justify-between gap-x-2 bg-background pb-4'>
        <DebouncedSearchInput
          placeholder='輸入標題...'
          value={(table.getColumn('headline')?.getFilterValue() as string) ?? ''}
          onChange={(value) => table.getColumn('headline')?.setFilterValue(value)}
        />
        <div className='flex items-center gap-x-2'>
          {table.getSelectedRowModel().rows.length > 0 ? (
            <>
              <DeleteModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                title={`你確定要刪除這${table.getSelectedRowModel().rows.length}筆資料嗎？`}
                description='此動作不可復原，這將永久刪除這些資料並從我們的服務器中刪除數據。'
                onConfirm={onConfirm}
              />
              <Button
                variant='destructive'
                onClick={() => setOpen(true)}
              >
                <TrashIcon className='mr-2 size-4' />
                刪除 {table.getSelectedRowModel().rows.length} 筆
              </Button>
            </>
          ) : (
            <>
              <AddButton
                onClick={() => router.push(`/dashboard/project/${params.projectId}/news/new`)}
              />
              <DataTableViewOptions table={table} />
            </>
          )}
        </div>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={getCommonPinningStyles(header.column)}
                      onClick={() => header.column.pin('left')}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={getCommonPinningStyles(cell.column)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  未找到符合條件的資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='px-2 py-4'>
        <div className='mb-4 flex items-center justify-between'>
          <DataTablePageSizeSelector table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
