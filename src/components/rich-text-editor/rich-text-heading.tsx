import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from 'lucide-react';
import { useCallback } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const HeadingSelectItem = ({ value, size }: { value: string; size: number }) => {
  const icons = {
    '1': Heading1Icon,
    '2': Heading2Icon,
    '3': Heading3Icon,
    '4': Heading4Icon,
    '5': Heading5Icon,
    '6': Heading6Icon,
  };
  const Icon = icons[value as keyof typeof icons];
  return (
    <SelectItem value={value}>
      <Icon size={size} />
    </SelectItem>
  );
};

export const RichTextHeading = ({ editor }: { editor: Editor }) => {
  const handleValueChange = useCallback(
    (level: string) => {
      if (level === '0') {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: parseInt(level) as unknown as Level })
          .run();
      }
    },
    [editor]
  );

  return (
    <Select
      defaultValue='0'
      value={String(editor.getAttributes('heading')?.level ?? '0')}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className='w-20 md:w-30'>
        <SelectValue className='!text-sm' />
      </SelectTrigger>
      <SelectContent side='bottom'>
        <SelectItem value='0'>
          <p className='text-xs'>Text</p>
        </SelectItem>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <HeadingSelectItem
            value={String(value)}
            size={32 - value * 2}
            key={value}
          />
        ))}
      </SelectContent>
    </Select>
  );
};
