import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { GripVerticalIcon, PenIcon, Trash2Icon } from 'lucide-react';

import { useOpen } from '@/hooks/use-open';
import { useRaisedShadow } from '@/hooks/use-raised-shadow';

import type { Content } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

import { DoubleConfirmButton } from '../double-confirm-button';
import { AlertModal } from '../ui/alert-modal';
import { Button } from '../ui/button';

interface ContentDragListItemProps extends PropsWithChildren {
  item: Content & { id: string };
  onDelete: () => void;
}

export const ContentDragListItem = ({ item, children, onDelete }: ContentDragListItemProps) => {
  const { isOpen, onOpen, onClose } = useOpen();
  const dragControls = useDragControls();
  const y = useMotionValue<number>(0);
  const boxShadow = useRaisedShadow(y);

  const renderType = () => {
    switch (item.type) {
      case CONTENT_TYPE.HEADING:
        return '標題';
      case CONTENT_TYPE.PARAGRAPH:
        return '文字';
      case CONTENT_TYPE.IMAGE:
        return '圖片';
      default:
        return '';
    }
  };

  return (
    <Reorder.Item
      id={item.id}
      key={item.id}
      value={item}
      className='border-gray-200 pointer-events-none relative flex items-center justify-between rounded-md border bg-white p-4 shadow-sm focus:outline-none'
      style={{ y, boxShadow }}
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
          onPointerDown={(event) => dragControls.start(event)}
        >
          <GripVerticalIcon className='size-6' />
        </button>
        <span className='ml-2 truncate capitalize'>{renderType()}</span>
      </div>
      <div className='pointer-events-auto absolute right-4 top-half inline-flex -translate-y-half items-center gap-x-2'>
        <Button
          type='button'
          variant='secondary'
          size='icon'
          className='z-2 rounded-md px-3 py-2 text-foreground/50 transition-[color,background-color,opacity] duration-200 ease-in-out focus:outline-none hocus-visible:bg-muted hocus-visible:text-primary'
          onClick={onOpen}
        >
          <PenIcon className='size-4' />
        </Button>
        <DoubleConfirmButton
          variant='secondary'
          size='icon'
          className='z-2 rounded-md px-3 py-2 text-foreground/50 transition-[color,background-color] duration-200 ease-in-out focus:outline-none focus-visible:outline-destructive hocus-visible:bg-muted/50 hocus-visible:text-destructive'
          confirmClassName='text-white bg-destructive hocus-visible:bg-destructive hocus-visible:text-white'
          confirmText='刪除'
          onConfirm={onDelete}
        >
          <Trash2Icon className='size-4' />
        </DoubleConfirmButton>
      </div>
      <AlertModal
        title='更新'
        description='請選擇一個內文類型，並填寫內容'
        isOpen={isOpen}
        onClose={onClose}
      >
        {children}
      </AlertModal>
    </Reorder.Item>
  );
};
