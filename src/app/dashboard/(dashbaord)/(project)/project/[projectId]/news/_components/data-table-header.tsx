import type { Table } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';

import { AddButton } from '@/components/add-button';
import { DataTableViewOptions, DebouncedSearchInput } from '@/components/data-table';

import type { FormattedNews } from '../type';

import { DeleteNewsModal } from './delete-news-modal';

export function DataTableHeader({ table }: { table: Table<FormattedNews> }) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedRows = table.getSelectedRowModel().rows;

  const searchValue = (table.getColumn('formattedHeadline')?.getFilterValue() as string) ?? '';

  const onInputChange = (value: string) => {
    table.getColumn('formattedHeadline')?.setFilterValue(value);
  };

  return (
    <div className='flex items-center justify-between gap-x-2 bg-background pb-4'>
      <DebouncedSearchInput
        value={searchValue}
        onChange={onInputChange}
        placeholder='輸入標題...'
      />
      <div className='flex items-center gap-x-2'>
        {selectedRows.length > 0 ? (
          <DeleteNewsModal
            data={selectedRows.map((row) => row.original.id)}
            title={`你確定要刪除這${selectedRows.length}筆資料嗎？`}
            description='這些資料可在 “刪除列表” 中進行復原'
            buttonText={`刪除 ${selectedRows.length} 筆`}
          />
        ) : (
          <>
            <AddButton onClick={() => router.push(`${pathname}/add-news`)} />
            <DataTableViewOptions table={table} />
          </>
        )}
      </div>
    </div>
  );
}
