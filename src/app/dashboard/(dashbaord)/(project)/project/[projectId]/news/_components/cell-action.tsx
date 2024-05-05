'use client';

import { EditIcon, MoreHorizontal } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { FormattedNews } from '../type';

export const CellAction = ({ data }: { data: FormattedNews }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
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
        {/* <DropdownMenuItem
            className='cursor-pointer'
            onClick={onOpen}
          >
            <TrashIcon className='mr-2 size-4' />
            刪除
          </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
