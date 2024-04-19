import { AnimatePresence, m, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { GripVerticalIcon, PenIcon, Trash2Icon } from 'lucide-react';

import { useRaisedShadow } from '@/hooks/use-raised-shadow';

import type { Content } from '@/lib/types';

interface ContentDragListItemProps {
  isSelected: boolean;
  item: Content & { id: string };
  onDelete: () => void;
  onSelect: () => void;
}

export const ContentDragListItem = ({
  isSelected,
  item,
  onDelete,
  onSelect,
}: ContentDragListItemProps) => {
  const dragControls = useDragControls();
  const y = useMotionValue<number>(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item
      id={item.id}
      key={item.id}
      value={item}
      className='border-gray-200 relative flex items-center justify-between rounded-md border bg-white p-2 shadow-sm lg:p-4 '
      style={{ y, boxShadow }}
      dragControls={dragControls}
      dragListener={false}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        x: 0,
        opacity: 1,
        scale: isSelected ? 1.02 : 1,
        boxShadow: isSelected ? '0px 2px 8px 0px rgba(0,0,0,0.1)' : 'none',
        transition: { duration: 0.2 },
      }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
    >
      <div className='flex w-full items-center pr-15 lg:pr-20'>
        <button
          className='pointer-events-auto z-2 shrink-0 cursor-grab overflow-hidden rounded-md px-0.5 py-1 transition-colors duration-200 ease-in-out hover:bg-muted active:cursor-grabbing active:bg-muted'
          onPointerDown={(event) => dragControls.start(event)}
        >
          <GripVerticalIcon className='size-6' />
        </button>
        <span className='ml-2 truncate capitalize'>{item.type}</span>
      </div>
      <div className='absolute right-2 top-half inline-flex -translate-y-half items-center gap-x-1 lg:right-4 lg:gap-x-2'>
        <AnimatePresence
          mode='wait'
          initial={false}
        >
          {isSelected && (
            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PenIcon className='size-4 opacity-50' />
            </m.span>
          )}
        </AnimatePresence>
        <button
          type='button'
          className='z-2 rounded-md p-2 opacity-50 transition-[color,background-color,opacity] duration-200 ease-in-out focus:outline-none hocus:bg-muted hocus:text-destructive hocus:opacity-100'
          onClick={onDelete}
        >
          <Trash2Icon className='size-4' />
        </button>
      </div>
      <button
        type='button'
        className='absolute inset-0 size-full bg-transparent focus:outline-none'
        disabled={isSelected}
        onClick={onSelect}
      />
    </Reorder.Item>
  );
};
