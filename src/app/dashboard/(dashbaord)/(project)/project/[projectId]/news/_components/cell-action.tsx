'use client';

import { EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { DeleteModal } from '@/components/modals/delete-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDeleteNews } from '../hooks/use-delete-news';
import type { FormattedNews } from '../type';

export const CellAction = ({ data }: { data: FormattedNews }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onClose, onOpen, onDelete, onSuccess } = useDeleteNews(data.id);

  return (
    <>
      <DeleteModal
        title='你確定要刪除這筆資料嗎？'
        description='此資料可在 “刪除列表” 中進行復原'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
        onSuccess={onSuccess}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='size-8 p-0 text-center'
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>其他動作</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => router.push(`${pathname}/${data.id}`)}
          >
            <EditIcon className='mr-2 size-4' />
            編輯
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={onOpen}
          >
            <TrashIcon className='mr-2 size-4' />
            刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
