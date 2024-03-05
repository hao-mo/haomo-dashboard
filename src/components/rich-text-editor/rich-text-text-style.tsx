import type { Editor } from '@tiptap/react';
import {
  BoldIcon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

import { Toggle } from '../ui/toggle';

const BoldToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('bold')}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
    >
      <BoldIcon size={16} />
    </Toggle>
  );
};

const ItalicToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('italic')}
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
    >
      <ItalicIcon size={16} />
    </Toggle>
  );
};

const StrikeToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('strike')}
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
    >
      <StrikethroughIcon size={16} />
    </Toggle>
  );
};

const UnderlineToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('underline')}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
    >
      <UnderlineIcon size={16} />
    </Toggle>
  );
};

const HighlightToggle = ({ editor }: { editor: Editor }) => {
  return (
    <Toggle
      pressed={editor.isActive('highlight')}
      onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
      disabled={!editor.can().chain().focus().toggleHighlight().run()}
    >
      <HighlighterIcon size={16} />
    </Toggle>
  );
};

const TOGGLE_COMPONENTS = [
  BoldToggle,
  ItalicToggle,
  StrikeToggle,
  UnderlineToggle,
  HighlightToggle,
];

export const RichTextTextStyle = ({ editor }: { editor: Editor }) => (
  <>
    {TOGGLE_COMPONENTS.map((Component) => (
      <Component
        key={`rich-text-style-toggle-${Component.name}`}
        editor={editor}
      />
    ))}
  </>
);
