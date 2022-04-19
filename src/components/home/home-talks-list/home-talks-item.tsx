import Link from 'next/link';
import React from 'react';
import { BiMessageRounded, BiHeart } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Time } from '@/components/ui/time';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type HomeTalksItemProps = {
  talk: Talk;
};
// ___________________________________________________________________________
//
export const HomeTalksItem: React.VFC<HomeTalksItemProps> = ({ talk }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center py-4'>
      <div className='flex mr-3 grow'>
        <Link href={`/${talk.user.username}/talks/${talk.slug}`}>
          <a className='mr-3 shrink-0'>
            <Avatar size='md' src={talk.user.avatar_small_url} alt={talk.user.name} />
          </a>
        </Link>

        <div>
          <Link href={`/${talk.user.username}/talks/${talk.slug}`}>
            <a className='block font-semibold text-gray-800 break-all'>{talk.title}</a>
          </Link>

          <div className='flex flex-wrap items-center mt-3'>
            <div className='mr-2'>
              <Badge color={talk.closed ? 'secondary' : 'primary'} size='xs'>
                {talk.closed ? 'クローズ' : 'オープン'}
              </Badge>
            </div>

            <Link href={`/${talk.user.username}`}>
              <a className='block mr-2 text-sm text-gray-600'>{talk.user.username}</a>
            </Link>

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
          </div>
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
