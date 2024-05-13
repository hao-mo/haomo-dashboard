import { AnimatePresence, Reorder } from 'framer-motion';

import type { ContentWithId } from '../../_lib/schema';

import { DraggableContentItem } from './draggable-content-item';

interface ContentListProps {
  items: ContentWithId[];
  setItems: (items: ContentWithId[]) => void;
  onUpdate: (index: number, content: ContentWithId) => void;
  onDelete: (index: number) => void;
  disabled?: boolean;
}
export const ContentList = ({
  items,
  disabled,
  setItems,
  onUpdate,
  onDelete,
}: ContentListProps) => {
  const handleUpdateContent = (index: number) => (content: ContentWithId) => {
    const newItems = items.map((item, i) => (i === index ? content : item));
    setItems(newItems);
    onUpdate(index, content);
  };

  const handleDeleteContent = (index: number) => {
    onDelete(index);
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Reorder.Group
      className='mt-2 space-y-4 overflow-hidden rounded-md border bg-muted/50 p-4 md:p-8'
      axis='y'
      values={items}
      onReorder={setItems}
      layoutScroll
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <DraggableContentItem
            key={item.id}
            item={item}
            disabled={disabled}
            onUpdate={handleUpdateContent(index)}
            onDelete={() => handleDeleteContent(index)}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
