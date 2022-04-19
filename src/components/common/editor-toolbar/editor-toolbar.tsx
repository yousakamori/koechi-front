import { Menu } from '@headlessui/react';
import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  BiHeading,
  BiHighlight,
  BiBold,
  BiListOl,
  BiListUl,
  BiCode,
  BiItalic,
  BiStrikethrough,
  BiUnderline,
  BiMinus,
} from 'react-icons/bi';
import { DirectUploadButtonProps } from './direct-upload-button';
import { Dropdown } from '@/components/ui/dropdown';
// ___________________________________________________________________________
//
const DirectUploadButton = dynamic<DirectUploadButtonProps>(
  () => import('./direct-upload-button').then((mod) => mod.DirectUploadButton),
  { ssr: false },
);
// ___________________________________________________________________________
//
type ToggleButtonState = {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};
// ___________________________________________________________________________
//
const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonState>(
  ({ active, onClick, children }, ref) => {
    const classes = clsx(
      'p-1',
      'h-9',
      'w-9',
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'text-xl',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-blue-400',
      active ? 'text-blue-400' : 'text-secondary-500',
    );
    // ___________________________________________________________________________
    //
    return (
      <button ref={ref} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
// ___________________________________________________________________________
//
export type EditorToolbarProps = {
  editor: Editor;
};
// ___________________________________________________________________________
//
export const EditorToolbar: React.VFC<EditorToolbarProps> = ({ editor }) => {
  const afterUpload = (urls: string[]) => {
    editor.commands.insertContent(urls.map((url) => `<img src="${url}" />`).join(''));
    editor.view.focus();
  };
  // ___________________________________________________________________________
  //
  if (!editor) {
    return null;
  }
  // ___________________________________________________________________________
  //
  return (
    <div className='grid grid-cols-6 gap-3 pb-5 sm:grid-cols-11'>
      <Dropdown
        position='left'
        className='w-56'
        buttonContent={
          <Menu.Button as={React.Fragment}>
            <ToggleButton active={editor.isActive('heading')}>
              <BiHeading />
            </ToggleButton>
          </Menu.Button>
        }
      >
        <div>
          <Menu.Item>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`${
                editor.isActive('heading', { level: 1 }) ? 'text-blue-500 ' : 'text-gray-500 '
              }flex w-full p-3 text-sm hover:bg-gray-50 focus:outline-none`}
            >
              見出し1
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`${
                editor.isActive('heading', { level: 2 }) ? 'text-blue-500 ' : 'text-gray-500 '
              }flex w-full p-3 text-sm hover:bg-gray-50 focus:outline-none`}
            >
              見出し2
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`${
                editor.isActive('heading', { level: 3 }) ? 'text-blue-500 ' : 'text-gray-500 '
              }flex w-full p-3 text-sm hover:bg-gray-50 focus:outline-none`}
            >
              見出し3
            </button>
          </Menu.Item>
        </div>
      </Dropdown>

      <ToggleButton
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BiBold />
      </ToggleButton>
      <ToggleButton
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <BiItalic />
      </ToggleButton>
      <ToggleButton
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <BiUnderline />
      </ToggleButton>
      <ToggleButton
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <BiStrikethrough />
      </ToggleButton>
      <ToggleButton
        active={editor.isActive('highlight')}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <BiHighlight />
      </ToggleButton>

      <ToggleButton
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <BiListUl />
      </ToggleButton>
      <ToggleButton
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <BiListOl />
      </ToggleButton>

      <ToggleButton
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <BiCode />
      </ToggleButton>
      <ToggleButton active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <BiMinus />
      </ToggleButton>
      <DirectUploadButton afterUpload={afterUpload} />
    </div>
  );
};
