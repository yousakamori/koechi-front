import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { BiMessageRounded, BiHeart } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Time } from '@/components/ui/time';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type TalkItemProps = {
  talk: Talk;
  className?: string;
  avatar?: boolean;
  userLink?: boolean;
};
// ___________________________________________________________________________
//
export const TalkItem: React.VFC<TalkItemProps> = ({
  talk,
  className,
  avatar = true,
  userLink = true,
}) => {
  const talkStatus = (): { title: string; color: Required<BadgeProps['color']> } => {
    if (talk.archived) {
      return { title: 'アーカイブ', color: 'error' };
    } else if (talk.closed) {
      return { title: 'クローズ', color: 'secondary' };
    } else {
      return { title: 'オープン', color: 'primary' };
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <div className={clsx('flex items-center', className)}>
      <div className='flex mr-3 grow'>
        {avatar && (
          <Link href={`/${talk.user.username}/talks/${talk.slug}`}>
            <a className='mr-3 shrink-0'>
              <Avatar size='md' src={talk.user.avatar_small_url} alt={talk.user.name} />
            </a>
          </Link>
        )}

        <div>
          <Link href={`/${talk.user.username}/talks/${talk.slug}`}>
            <a className='block font-semibold text-gray-800 break-all'>{talk.title}</a>
          </Link>

          <div className='flex items-center mt-3'>
            <Badge color={talkStatus().color} size='xs'>
              {talkStatus().title}
            </Badge>

            <div className='ml-2'>
              {userLink && (
                <Link href={`/${talk.user.username}`}>
                  <a className='block mr-2 text-sm text-gray-800'>{talk.user.name}</a>
                </Link>
              )}

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
