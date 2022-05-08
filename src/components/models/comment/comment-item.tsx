import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { CommentEditFormProps } from '@/components/comment-edit-form';
import { LikeButtonProps } from '@/components/models/like';
import { LoginLinkModalProps } from '@/components/overlays/login-link-modal';
import { Avatar } from '@/components/ui/avatar';
import { Button, CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { ReplyButtonProps } from '@/components/ui/reply-button';
import { Time } from '@/components/ui/time';
import { useCurrentUser } from '@/hooks/current-user';
import { useToggle } from '@/hooks/toggle';
import { jsonToHtml } from '@/lib/editor';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
const LoginLinkModal = dynamic<LoginLinkModalProps>(() =>
  import('@/components/overlays/login-link-modal').then((mod) => mod.LoginLinkModal),
);

const LikeButton = dynamic<LikeButtonProps>(() =>
  import('@/components/models/like').then((mod) => mod.LikeButton),
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
  onOpenReplyForm: (values: Comment) => void;
};
// ___________________________________________________________________________
//
export const CommentItem: React.VFC<CommentItemProps> = React.memo(
  ({ comment, onUpdateComment, onDeleteComment, onOpenReplyForm }) => {
    const { currentUser } = useCurrentUser();
    const [editSlug, setEditSlug] = useState('');
    const [open, toggleModal] = useToggle();

    const handleOpenReplyForm = (comment: Comment) =>
      currentUser ? onOpenReplyForm(comment) : toggleModal();

    // ___________________________________________________________________________
    //
    return (
      <>
        {/* login link modal */}
        <LoginLinkModal open={open} onClose={toggleModal} />

        <div id={`comment-${comment.slug}`} className='flex justify-between space-x-2 bg-white'>
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
              {comment.is_mine && (
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
                      size='sm'
                      liked={comment.current_user_liked}
                      likableId={comment.id}
                      likedCount={comment.liked_count}
                      likableType='Comment'
                    />
                    {comment.children && (
                      <ReplyButton
                        onClick={() => handleOpenReplyForm(comment)}
                        commentsCount={comment.children.length}
                      />
                    )}
                  </footer>
                </>
              )}
            </div>
          </div>
        </div>
        {!comment.children && (
          <Button
            onClick={() => handleOpenReplyForm(comment)}
            roundedFull
            size='sm'
            color='secondary'
            variant='outlined'
          >
            返信を追加
          </Button>
        )}
      </>
    );
  },
);
// ___________________________________________________________________________
//
CommentItem.displayName = 'CommentItem';
