'use client';

import { MoreHorizontalIcon, PenIcon, TrashIcon } from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useOpen } from '@/hooks/use-open';

import type { Option } from '@/lib/types';

interface TagActionProps {
  option: Option;
  onEdit: (option: Option) => void;
  onDelete: (option: Option) => void;
}

export const TagAction = memo(({ option, onEdit, onDelete }: TagActionProps) => {
  const { isOpen, onOpenChange } = useOpen();

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='hocus-visible:bg-white/80'
        >
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-40'
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onEdit(option)}>
            <PenIcon className='mr-2 size-4' />
            編輯
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(option)}>
            <TrashIcon className='mr-2 size-4' />
            刪除
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

TagAction.displayName = 'TagAction';
