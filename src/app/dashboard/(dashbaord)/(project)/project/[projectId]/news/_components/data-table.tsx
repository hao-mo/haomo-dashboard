'use client';

import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { DataTablePageSizeSelector, DataTablePagination } from '@/components/data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { createQueryString } from '@/utils';

import type { News } from '../type';

import { DataTableHeader } from './data-table-header';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
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

export function DataTable<TValue>({ columns, data, pageCount }: DataTableProps<News, TValue>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const pageSize = searchParams.get('pageSize') ?? '10';

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(page) - 1,
    pageSize: Number(pageSize),
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();

  const table = useReactTable<News>({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    setPagination({
      pageIndex: Number(page) - 1,
      pageSize: Number(pageSize),
    });
  }, [page, pageSize]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(
        {
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        },
        searchParams
      )}`
    );
  }, [pagination]);

  return (
    <div className='relative'>
      <DataTableHeader table={table} />
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
                      // onClick={() => header.column.pin('left')}
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
