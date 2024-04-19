import { AnimatePresence, Reorder } from 'framer-motion';

import { ContentDragListItem } from './content-drag-list-item';

export const ContentDragList = () => {
  return (
    <Reorder.Group
      axis='y'
      values={items}
      onReorder={setItems}
      layoutScroll
      className='overflow-y-hidden rounded-md border bg-muted/50 p-4'
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <ContentDragListItem
            key={item.id}
            item={item}
            isSelected={false}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
