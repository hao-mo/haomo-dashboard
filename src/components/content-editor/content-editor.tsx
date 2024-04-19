import { AnimatePresence, Reorder } from 'framer-motion';
import type { Control, ControllerProps } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import type { Content } from '@/lib/types';

import { Label } from '../ui/label';

import { ContentDragListItem } from './content-drag-list-item';
import { ContentForm } from './content-form';

interface ContentEditorProps {
  name: string;
  control: Control<Content>;
}

export const ContentEditor = ({ name, control }: ControllerProps) => {
  return (
    <div className='w-full'>
      <Label className='text-sm'>內文</Label>
      <div className='mt-2 grid w-full grid-cols-12 gap-4'>
        <div className='col-span-4'>
          <Reorder.Group
            axis='y'
            values={fields}
            onReorder={replace}
            layoutScroll
            className='overflow-y-hidden rounded-md border bg-muted/50 p-4'
          >
            <AnimatePresence initial={false}>
              {fields.map((item, index) => (
                <ContentDragListItem
                  key={item.id}
                  item={item}
                  isSelected={false}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
        <div className='col-span-8'>
          <ContentForm />
        </div>
      </div>
    </div>
  );
};
