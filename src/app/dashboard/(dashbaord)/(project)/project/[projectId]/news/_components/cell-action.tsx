'use client';

import { EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

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

import { fetcher } from '@/utils';

import type { News } from '../type';

export const CellAction = ({ data }: { data: News }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await fetcher(`/api/${params.projectId}/news/${data.id}`, {
        method: 'DELETE',
      });
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
    <>
      <DeleteModal
        title='你確定要刪除此筆資料嗎？'
        description='此動作不可復原，這將永久刪除這筆資料並從我們的服務器中刪除數據。'
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
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
            onClick={() => router.push(`/dashboard/project/${params.projectId}/news/${data.id}`)}
          >
            <EditIcon className='mr-2 size-4' />
            編輯
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <TrashIcon className='mr-2 size-4' />
            刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
