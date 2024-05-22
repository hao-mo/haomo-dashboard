import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { GripVerticalIcon, MoreHorizontalIcon, PenIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';

import { useOpen } from '@/hooks/use-open';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';

import { CONTENT_TYPE } from '@/lib/types';

import type { ContentWithId } from '../../_lib/schema';

import { ContentForm } from '.';

const typeMap = {
  [CONTENT_TYPE.HEADING]: '標題',
  [CONTENT_TYPE.PARAGRAPH]: '文字',
  [CONTENT_TYPE.IMAGE]: '圖片',
};

interface DraggableContentItemProps {
  item: ContentWithId;
  onUpdate: (content: ContentWithId) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const DraggableContentItem = ({
  item,
  disabled,
  onUpdate,
  onDelete,
}: DraggableContentItemProps) => {
  const { isOpen, onOpenChange } = useOpen();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useOpen();

  const dragControls = useDragControls();
  const y = useMotionValue<number>(0);
  const boxShadow = useRaisedShadow(y);

  const handleUpdate = (content: ContentWithId) => {
    onUpdate(content);
    onModalClose();
  };

  const handleDelete = () => {
    onDelete();
    onModalClose();
  };

  return (
    <Reorder.Item
      id={item.id}
      key={item.id}
      value={item}
      className='border-gray-200 pointer-events-none relative flex items-center justify-between rounded-md border bg-white p-4 shadow-sm focus:outline-none'
      style={{ y, boxShadow }}
      tabIndex={-1}
      dragControls={dragControls}
      dragListener={false}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 5 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.2 },
      }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
    >
      <div className='flex w-full items-center pr-24 lg:pr-32'>
        <button
          className='pointer-events-auto z-2 shrink-0 cursor-grab overflow-hidden rounded-md px-0.5 py-1 transition-colors duration-200 ease-in-out hover:bg-muted focus:outline-none active:cursor-grabbing active:bg-muted'
          tabIndex={-1}
          onPointerDown={(event) => dragControls.start(event)}
        >
          <GripVerticalIcon className='size-6' />
        </button>
        <span className='ml-2 truncate capitalize'>{typeMap[item.type]}</span>
      </div>
      <div className='pointer-events-auto absolute right-4 top-half inline-flex -translate-y-half items-center gap-x-2'>
        <DropdownMenu
          open={isOpen}
          onOpenChange={onOpenChange}
        >
          <DropdownMenuTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              disabled={disabled}
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
              <DropdownMenuItem onClick={onModalOpen}>
                <PenIcon className='mr-2 size-4' />
                編輯
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className='text-destructive'
              >
                <TrashIcon className='mr-2 size-4' />
                刪除
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {disabled && <div className='pointer-events-auto absolute inset-0 z-2 bg-white opacity-50' />}
      <Modal
        title='更新'
        description='請修改內容並確認更新'
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ContentForm
          content={item}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Modal>
    </Reorder.Item>
  );
};
