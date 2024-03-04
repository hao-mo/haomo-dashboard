import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';

export const RichTextBubbleMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      className='rounded-md bg-background px-2 py-1 shadow-md'
      tippyOptions={{
        duration: 200,
      }}
    >
      This is the bubble menu
    </BubbleMenu>
  );
};
