import { Blockquote } from '@tiptap/extension-blockquote';
import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Heading } from '@tiptap/extension-heading';
import { Highlight } from '@tiptap/extension-highlight';
import { History } from '@tiptap/extension-history';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Image } from '@tiptap/extension-image';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Strike } from '@tiptap/extension-strike';
import { Text } from '@tiptap/extension-text';
import { Underline } from '@tiptap/extension-underline';
import { generateHTML } from '@tiptap/html';
import { Extension } from '@tiptap/react';

export const editorExtensionsFactory = (injects: Extension[] = []) => {
  return [
    Document,
    Bold,
    Blockquote,
    Dropcursor,
    Italic,
    Image,
    Link,
    Strike,
    Underline,
    Paragraph,
    HorizontalRule,
    Text,
    BulletList,
    OrderedList,
    ListItem,
    History,
    Highlight.configure({ multicolor: true }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
    ...injects,
  ];
};

export const jsonToHtml = (text: string) => {
  return {
    __html: generateHTML(JSON.parse(text), editorExtensionsFactory()),
  };
};
