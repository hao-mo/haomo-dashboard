import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import type { Extensions } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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

export const richTextExtensions: Extensions = [
  StarterKit.configure({
    // heading: {
    //   levels: [1, 2, 3, 4, 5, 6],
    //   HTMLAttributes: {
    //     class: 'text-4xl font-bold',
    //   },
    // },
    bulletList: {
      keepMarks: true,
      // Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      // Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      keepAttributes: false,
    },
  }),
  TextStyle,
  Heading.extend({
    levels: [1, 2, 3, 4, 5, 6],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes: { [index: number]: string } = {
        1: 'text-5xl',
        2: 'text-4xl',
        3: 'text-3xl',
        4: 'text-2xl',
        5: 'text-xl',
        6: 'text-lg',
      };
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
  }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
  TextAlign.configure({
    alignments: ['left', 'center', 'right'],
  }),
  Link.configure({
    protocols: ['ftp', 'mailto'],
    linkOnPaste: true,
    HTMLAttributes: {
      class: 'text-primary underline cursor-pointer underline-offset-2',
      rel: 'noopener noreferrer',
      // Remove target entirely so links open in current tab
      target: '_blank',
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Underline.configure({
    HTMLAttributes: {
      class: 'underline underline-offset-2',
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
];
