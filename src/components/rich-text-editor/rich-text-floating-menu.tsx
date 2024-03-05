import type { Editor } from '@tiptap/react';
import { FloatingMenu } from '@tiptap/react';

export const RichTextFloatingMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <FloatingMenu
      editor={editor}
      className='rounded-md bg-background px-2 py-1 shadow-md'
      tippyOptions={{
        duration: 200,
      }}
    >
      This is the floating menu
    </FloatingMenu>
  );
};
