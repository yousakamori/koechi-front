import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { CommentEditFormProps } from '@/components/comment-edit-form';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { LikeButtonProps } from '@/components/ui/like-button';
import { ReplyButtonProps } from '@/components/ui/reply-button';
import { Time } from '@/components/ui/time';
import { useCurrentUser } from '@/hooks/current-user';
import { jsonToHtml } from '@/lib/editor';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
const LikeButton = dynamic<LikeButtonProps>(() =>
  import('@/components/ui/like-button').then((mod) => mod.LikeButton),
);

const ReplyButton = dynamic<ReplyButtonProps>(() =>
  import('@/components/ui/reply-button').then((mod) => mod.ReplyButton),
);

const CommentEditForm = dynamic<CommentEditFormProps>(() =>
  import('@/components/comment-edit-form').then((mod) => mod.CommentEditForm),
);
// ___________________________________________________________________________
//
export type CommentItemProps = {
  comment: Comment;
  onUpdateComment: (values: Comment) => Promise<void>;
  onDeleteComment: (values: Comment) => Promise<void>;
  onOpenReplyForm?: (values: Comment) => void;
};
// ___________________________________________________________________________
//
export const CommentItem: React.VFC<CommentItemProps> = React.memo(
  ({ comment, onUpdateComment, onDeleteComment, onOpenReplyForm }) => {
    const [editSlug, setEditSlug] = useState('');
    const { currentUser } = useCurrentUser();
    const isMine = currentUser && currentUser.id === comment.user.id;
    // ___________________________________________________________________________
    //
    return (
      <div
        id={`comment-${comment.slug}`}
        className='flex justify-between space-x-2 bg-white snap-mt-20 lg:snap-mt-4'
      >
        <div className='flex flex-col items-center w-9'>
          <Avatar src={comment.user.avatar_small_url} size='sm' />
          {!comment.children && <div className='flex-grow w-px my-1 bg-gray-400' />}
        </div>
        <div className='flex-1 mb-4'>
          <div className='flex items-center mb-4'>
            <p className='text-sm font-semibold text-gray-900 line-clamp-1'>
              <Link href={`/${comment.user.username}`}>
                <a>{comment.user.name}</a>
              </Link>
            </p>
            <Time
              size='sm'
              className='flex-shrink-0 ml-2 text-gray-500 '
              date={
                comment.body_updated_at
                  ? new Date(comment.body_updated_at)
                  : new Date(comment.created_at)
              }
            />
            {isMine && (
              <div className='ml-auto'>
                <Dropdown
                  position='right'
                  className='w-36'
                  buttonContent={
                    <Menu.Button as={React.Fragment}>
                      <CircleButton variant='none' color='secondary' aria-label='メニューを開く'>
                        <BiChevronDown />
                      </CircleButton>
                    </Menu.Button>
                  }
                >
                  <div>
                    <Menu.Item>
                      <button
                        onClick={() => setEditSlug(comment.slug)}
                        className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                      >
                        編集する
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        onClick={() => onDeleteComment(comment)}
                        className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                      >
                        削除する
                      </button>
                    </Menu.Item>
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
          <div className={`${comment.children ? 'break-all -ml-11' : 'break-all'}`}>
            {comment.slug === editSlug ? (
              <CommentEditForm
                comment={comment}
                onCancel={() => setEditSlug('')}
                onUpdateComment={async (comment) => {
                  await onUpdateComment(comment);
                  setEditSlug('');
                }}
              />
            ) : (
              <>
                <div
                  className='prose prose-sky max-w-none'
                  dangerouslySetInnerHTML={jsonToHtml(comment.body_json)}
                />
                <footer className='flex items-center justify-start mt-3 space-x-3'>
                  <LikeButton
                    likableId={comment.id}
                    likableType='Comment'
                    size='sm'
                    likedCount={comment.liked_count}
                  />
                  {onOpenReplyForm && comment.children && (
                    <ReplyButton
                      onClick={() => onOpenReplyForm(comment)}
                      commentsCount={comment.children.length}
                    />
                  )}
                </footer>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
);
// ___________________________________________________________________________
//
CommentItem.displayName = 'CommentItem';
