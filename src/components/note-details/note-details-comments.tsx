import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CommentCreateFormProps } from '@/components/comment-create-form';
import { CommentItem } from '@/components/models/comment';
import { Typography } from '@/components/ui/typography';
import { useComments } from '@/hooks/comments';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
const CommentCreateForm = dynamic<CommentCreateFormProps>(() =>
  import('@/components/comment-create-form').then((mod) => mod.CommentCreateForm),
);
// ___________________________________________________________________________
//
export type NoteDetailsCommentsProps = {
  comments: Comment[];
  noteId: number;
};
// ___________________________________________________________________________
//
export const NoteDetailsComments: React.VFC<NoteDetailsCommentsProps> = ({
  comments: initialComments,
  noteId,
}) => {
  const { comments, validating, createComment, updateComment, deleteComment } =
    useComments(initialComments);
  const [parentComment, setParentComment] = useState<Comment | null>(null);
  const handleOpenReplyForm = (comment: Comment) => setParentComment(comment);
  const handleCloseReplyForm = () => setParentComment(null);

  const handleCreateComment = async ({
    body_text,
    body_json,
  }: {
    body_text: string;
    body_json: string;
  }) => {
    const { error } = await createComment({
      body_text,
      body_json,
      commentable_id: noteId,
      commentable_type: 'Note',
      parent_id: parentComment?.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setParentComment(null);
      toast.success('投稿しました');
    }
  };

  const handleDeleteComment = async (values: Comment) => {
    if (!confirm('本当に削除しますか?')) {
      return;
    }

    const { error } = await deleteComment(values);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('削除しました');
    }
  };

  const handleUpdateComment = async (values: Comment) => {
    const { error } = await updateComment(values);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('更新しました');
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <div className='mt-10 bg-white border-t border-gray-200 rounded-t-lg border-x'>
        <div className='py-4'>
          <Typography align='center' fontSize='lg'>
            コメント
          </Typography>
          {comments.length <= 0 && (
            <div className='w-full'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className='mx-auto' src='/images/write.svg' width='280' height='280' alt='' />
            </div>
          )}
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className='px-5 py-4 border-t border-gray-200'>
            <CommentItem
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
              onOpenReplyForm={handleOpenReplyForm}
            />
          </div>
        ))}
      </div>
      <CommentCreateForm
        parentComment={parentComment}
        validating={validating}
        onCloseForm={handleCloseReplyForm}
        onCreateComment={handleCreateComment}
      />
    </>
  );
};
