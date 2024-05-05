'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { formatRelative } from '@/utils/format';

import type { FormattedNews } from '../type';

import { CellLink } from './cell-link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FormattedNews>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex size-full items-center justify-center pr-4 text-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex size-full items-center justify-center pr-4 text-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
  },
  {
    accessorKey: 'status',
    header: '狀態',
    cell: ({ row }) => {
      const status = row.getValue('status');
      const getVariant = () => {
        if (status === 'archived') {
          return 'secondary';
        } else if (status === 'draft') {
          return 'outline';
        } else if (status === 'processing') {
          return 'default';
        } else if (status === 'published') {
          return 'success';
        } else {
          return 'destructive';
        }
      };
      const getStatus = () => {
        if (status === 'draft') {
          return '草稿中';
        } else if (status === 'processing') {
          return '發布中';
        } else if (status === 'published') {
          return '已發佈';
        } else if (status === 'failed') {
          return '發布失敗';
        } else {
          return '已封存';
        }
      };

      return <Badge variant={getVariant()}>{getStatus()}</Badge>;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'formattedHeadline',
    header: () => '標題',
    enableHiding: false,
    cell: ({ row }) => <CellLink data={row.original} />,
  },
  // {
  //   accessorKey: 'date',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title='發布時間'
  //     />
  //   ),
  //   cell: ({ row }) => formatDate(row.getValue('date'), 'YYYY/MM/dd'),
  // },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='建立時間'
      />
    ),
    cell: ({ row }) => (
      <span className='capitalize'>{formatRelative(row.getValue('createdAt'))}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='更新時間'
      />
    ),
    cell: ({ row }) => (
      <span className='capitalize'>{formatRelative(row.getValue('updatedAt'))}</span>
    ),
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
