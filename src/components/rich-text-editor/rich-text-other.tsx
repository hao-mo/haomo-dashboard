import type { Editor } from '@tiptap/react';
import { RedoIcon, UndoIcon } from 'lucide-react';

import { Button } from '../ui/button';

export const RichTextOther = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoIcon size={16} />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoIcon size={16} />
      </Button>
    </>
  );
};
