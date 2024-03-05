import type { Editor } from '@tiptap/react';
import { ListIcon, ListOrderedIcon, ListXIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';

const OrderListToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('orderedList')}
      onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      disabled={!editor.can().chain().focus().toggleOrderedList().run()}
    >
      <ListOrderedIcon size={16} />
    </Toggle>
  );
};

const BulletListToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('bulletList')}
      onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      disabled={!editor.can().chain().focus().toggleBulletList().run()}
    >
      <ListIcon size={16} />
    </Toggle>
  );
};

const RemoveListButton = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => editor.chain().focus().clearNodes().run()}
    >
      <ListXIcon size={16} />
    </Button>
  );
};

const TOGGLE_COMPONENTS = [BulletListToggle, OrderListToggle, RemoveListButton];

export const RichTextList = ({ editor }: { editor: Editor }) => {
  return (
    <>
      {TOGGLE_COMPONENTS.map((Component) => (
        <Component
          key={`rich-text-list-toggle-${Component.name}`}
          editor={editor}
        />
      ))}
    </>
  );
};
