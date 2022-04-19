import Link from 'next/link';
import React from 'react';
import { BiHeart, BiMessageRounded } from 'react-icons/bi';
import { Badge } from '@/components/ui/badge';
import { Time } from '@/components/ui/time';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type StatusBadgeProps = {
  talk: Talk;
};
// ___________________________________________________________________________
//
export const StatusBadge: React.VFC<StatusBadgeProps> = ({ talk }) => {
  if (talk.archived) {
    return (
      <Badge color='error' size='xs'>
        アーカイブ
      </Badge>
    );
  }

  if (talk.closed) {
    return (
      <Badge color='secondary' size='xs'>
        クローズ
      </Badge>
    );
  }

  return (
    <Badge color='primary' size='xs'>
      オープン
    </Badge>
  );
};
// ___________________________________________________________________________
//
export type UserTalksItemProps = {
  talk: Talk;
};
// ___________________________________________________________________________
//
export const UserTalksItem: React.VFC<UserTalksItemProps> = ({ talk }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center p-4'>
      <div className='flex-1 mr-2'>
        <Link href={`/${talk.user.username}/talks/${talk.slug}`}>
          <a className='block font-semibold text-gray-800 break-all'>{talk.title}</a>
        </Link>

        <div className='flex flex-wrap items-center mt-3'>
          <div className='mr-2'>
            <StatusBadge talk={talk} />
          </div>
          {!talk.archived && talk.closed_at && (
            <Time
              size='xs'
              className='text-gray-500 '
              suffix='にクローズ'
              date={new Date(talk.closed_at)}
            />
          )}

          {!talk.archived && !talk.closed && (
            <Time
              size='xs'
              className='text-gray-500 '
              suffix='にコメントを追加'
              date={
                talk.last_comment_created_at
                  ? new Date(talk.last_comment_created_at)
                  : new Date(talk.created_at)
              }
            />
          )}
        </div>
      </div>

      <div className='flex flex-col items-center justify-end text-xs text-gray-400'>
        <BiMessageRounded className='text-lg' />
        {talk.comments_count}
      </div>
      <div className='flex flex-col items-center justify-end ml-2 text-xs text-red-400'>
        <BiHeart className='text-lg' />
        {talk.liked_count}
      </div>
    </div>
  );
};
