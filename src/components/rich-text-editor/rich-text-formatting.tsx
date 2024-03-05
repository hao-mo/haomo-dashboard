import type { Editor } from '@tiptap/react';
import {
  CodeIcon,
  CodeSquareIcon,
  LinkIcon,
  QuoteIcon,
  RemoveFormattingIcon,
  UnlinkIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';

const CodeToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('code')}
      onPressedChange={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
    >
      <CodeIcon size={16} />
    </Toggle>
  );
};

const CodeBlockToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('codeBlock')}
      onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
    >
      <CodeSquareIcon size={16} />
    </Toggle>
  );
};

const BlockquoteToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('blockquote')}
      onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      disabled={!editor.can().chain().focus().toggleBlockquote().run()}
    >
      <QuoteIcon size={16} />
    </Toggle>
  );
};

const LinkToggle = ({ editor }: { editor: Editor }) => {
  const setLink = async () => {
    const url = await navigator.clipboard.readText();

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run();

      return;
    }
    editor.chain().focus().toggleLink({ href: url }).run();
  };

  return (
    <Toggle
      pressed={editor.isActive('link')}
      onPressedChange={setLink}
      disabled={
        !editor
          .can()
          .chain()
          .focus()
          .toggleLink({ href: editor.getAttributes('link').href })
          .run()
      }
    >
      <LinkIcon size={16} />
    </Toggle>
  );
};

const UnlinkButton = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => editor.chain().focus().unsetLink().run()}
    >
      <UnlinkIcon size={16} />
    </Button>
  );
};

const RemoveFormattingButton = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => editor.chain().focus().unsetAllMarks().run()}
    >
      <RemoveFormattingIcon size={16} />
    </Button>
  );
};

const TOGGLE_COMPONENTS = [
  CodeToggle,
  CodeBlockToggle,
  BlockquoteToggle,
  LinkToggle,
  UnlinkButton,
  RemoveFormattingButton,
];

export const RichTextFormatting = ({ editor }: { editor: Editor }) => {
  return (
    <>
      {TOGGLE_COMPONENTS.map((Component) => (
        <Component
          key={`rich-text-formatting-toggle-${Component.name}`}
          editor={editor}
        />
      ))}
    </>
  );
};
