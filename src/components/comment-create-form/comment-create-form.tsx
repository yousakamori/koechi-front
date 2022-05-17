import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { Spinner } from '../ui/spinner';
import { EditorToolbar } from '@/components/editor-toolbar';
import { Avatar } from '@/components/ui/avatar';
import { Button, CircleButton } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/current-user';
import { editorExtensionsFactory } from '@/lib/editor';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
export type CommentCreateFormProps = {
  validating: boolean;
  parentComment: Comment | null;
  onCloseForm: () => void;
  onCreateComment: (body: Pick<Comment, 'body_text' | 'body_json'>) => Promise<void>;
};
// ___________________________________________________________________________
//
export const CommentCreateForm: React.VFC<CommentCreateFormProps> = ({
  validating,
  parentComment,
  onCloseForm,
  onCreateComment,
}) => {
  const isReplyForm = parentComment !== null;
  const haveChildren = parentComment && parentComment.children && parentComment.children.length > 0;
  const { authChecking, currentUser } = useCurrentUser();

  const replySourceComment = haveChildren
    ? (parentComment?.children?.slice(-1)[0] as Comment)
    : (parentComment as Comment);

  const editor = useEditor({
    extensions: editorExtensionsFactory([Placeholder.configure({ placeholder: 'コメントを追加' })]),
    injectCSS: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sky max-w-none focus:outline-none',
      },
    },
  });

  const handleCreateComment = async () => {
    if (!editor) {
      return;
    }

    await onCreateComment({
      body_text: editor.state.doc.textContent,
      body_json: JSON.stringify(editor.getJSON()),
    });
    editor.commands.clearContent();
  };

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (isReplyForm) {
      editor.view.focus();
    }
  }, [isReplyForm, editor]);
  // ___________________________________________________________________________
  //
  if (!editor || authChecking) {
    return <Spinner color='primary' size='md' />;
  }
  // ___________________________________________________________________________
  //
  if (currentUser) {
    return (
      <div
        className={clsx(
          'bg-white',
          'px-5',
          'py-4',
          'border',
          'border-gray-200',
          isReplyForm && 'sticky -bottom-1 z-30',
        )}
      >
        {isReplyForm && (
          <>
            <div className='flex items-center justify-between my-4'>
              <div className='text-sm font-bold text-gray-600'>
                {haveChildren
                  ? 'スレッドにコメントを追加'
                  : `${parentComment.user.name}さんへの返信`}
              </div>
              <CircleButton
                onClick={onCloseForm}
                color='secondary'
                aria-label='編集フォームを閉じる'
              >
                <BiX />
              </CircleButton>
            </div>
            <div className='flex items-center justify-start my-4 space-x-2'>
              <Avatar src={replySourceComment.user.avatar_small_url} size='sm' />
              <div className='flex-1 text-sm text-gray-500 line-clamp-2 max-h-11'>
                {replySourceComment.body_text}
              </div>
            </div>
          </>
        )}
        <header>
          <EditorToolbar editor={editor} />
        </header>
        <div onClick={() => editor.view.focus()} className='min-h-40'>
          <EditorContent editor={editor} />
        </div>
        <footer className='flex pt-4 mt-3 border-t border-gray-200'>
          <Button
            onClick={handleCreateComment}
            loading={validating}
            disabled={editor.isEmpty}
            className='ml-auto'
          >
            投稿する
          </Button>
        </footer>
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <div className='px-5 py-4 mt-6 bg-white border border-gray-200 rounded-lg'>
      <div className='text-center'>
        <p className='text-base text-gray-400'>ログインするとコメントできます</p>
        <Link href='/login' passHref>
          <Button className='mt-6'>ログイン</Button>
        </Link>
      </div>
    </div>
  );
};
