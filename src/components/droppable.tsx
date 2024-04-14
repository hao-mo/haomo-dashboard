'use client';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({ children }: PropsWithChildren) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      {children}
    </div>
  );
}
