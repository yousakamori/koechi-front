import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react';
import { EditorToolbar } from '@/components/common/editor-toolbar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { editorExtensionsFactory, parseBodyText } from '@/lib/editor';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
export type CommentEditFormProps = {
  comment: Comment;
  onCancel: () => void;
  onUpdateComment: (values: Comment) => void;
};
// ___________________________________________________________________________
//
export const CommentEditForm: React.VFC<CommentEditFormProps> = ({
  comment,
  onCancel,
  onUpdateComment,
}) => {
  const editor = useEditor({
    extensions: editorExtensionsFactory([Placeholder.configure({ placeholder: '内容を編集' })]),
    content: parseBodyText(comment.body_json),
    editorProps: {
      attributes: {
        class: 'prose prose-sky max-w-none focus:outline-none',
      },
    },
    autofocus: true,
  });
  // ___________________________________________________________________________
  //
  if (!editor) {
    return <Spinner color='primary' size='md' />;
  }
  // ___________________________________________________________________________
  //
  return (
    <div className='px-5 py-4 mt-6 bg-white'>
      <header>
        <EditorToolbar editor={editor} />
      </header>
      <div onClick={() => editor.view.focus()} className='min-h-40'>
        <EditorContent editor={editor} />
      </div>
      <footer className='flex pt-4 mt-3 border-t border-gray-200'>
        <Button className='ml-auto' onClick={onCancel} color='secondary' variant='outlined'>
          キャンセル
        </Button>
        <Button
          className='ml-3'
          disabled={editor.isEmpty}
          onClick={() =>
            onUpdateComment({
              ...comment,
              body_text: editor.state.doc.textContent,
              body_json: JSON.stringify(editor.getJSON()),
            })
          }
        >
          更新する
        </Button>
      </footer>
    </div>
  );
};
