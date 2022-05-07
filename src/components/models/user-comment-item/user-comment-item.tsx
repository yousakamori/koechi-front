import Link from 'next/link';
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Time } from '@/components/ui/time';
import { UserComment } from '@/types/comment';
import { User } from '@/types/user';
// ___________________________________________________________________________
//
export type UserCommentItemProps = {
  comment: UserComment;
  user: User;
};
// ___________________________________________________________________________
//
export const UserCommentItem: React.VFC<UserCommentItemProps> = ({ comment, user }) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <Link href={`/link/comments/${comment.slug}`} key={comment.id}>
        <a className='block p-4 group'>
          <div className='flex items-center space-x-3'>
            <div className='shrink-0'>
              <Avatar size='md' src={user.avatar_small_url} alt={user.name} />
            </div>
            <div>
              <div className='text-sm font-semibold text-gray-800'>{user.name}</div>

              <div>
                <Time
                  className='text-gray-500'
                  size='xs'
                  suffix='に'
                  date={new Date(comment.created_at)}
                />
                <span className='text-sm font-semibold text-gray-800 break-all'>
                  {comment.commentable.title}
                </span>
                <span className='text-xs text-gray-500'>
                  {comment.reply ? 'の中で返信' : 'へ投稿'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-3 text-base text-gray-800 break-all group-hover:underline'>
            {comment.title}
          </div>
        </a>
      </Link>
    </>
  );
};
