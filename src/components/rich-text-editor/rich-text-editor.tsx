'use client';

import { EditorContent, useEditor } from '@tiptap/react';

import { RichTextBubbleMenu } from './rich-text-bubble-menu';
import { richTextExtensions } from './rich-text-extenstions';
import { RichTextFloatingMenu } from './rich-text-floating-menu';
import { RichTextToolbar } from './rich-text-toolbar';

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export const RichTextEditor = ({ children }: Partial<PropsWithChildren>) => {
  const editor = useEditor({
    content,
    extensions: richTextExtensions,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none leading-loose font-normal text-sm',
      },
    },
  });

  return (
    <>
      <RichTextToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className='relative max-h-screen-1/2 overflow-y-auto rounded-md border border-muted-foreground/30 shadow-md'
      />
      <RichTextFloatingMenu editor={editor} />
      <RichTextBubbleMenu editor={editor} />
      {children}
    </>
  );
};

// https://vikramthyagarajan.medium.com/how-to-build-a-notion-like-text-editor-in-react-and-tiptap-7f394c36ed9d

// https://tiptap.dev/docs/editor/introduction
// https://dev.to/brampayrequest/tiptap-image-resize-extension-2328
// https://github.com/niuware/mui-rte
