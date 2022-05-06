import Link from 'next/link';
import React from 'react';
import { BiHeart } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { Emoji } from '@/components/ui/emoji';
import { Time } from '@/components/ui/time';
import { MyLike } from '@/types/like';
// ___________________________________________________________________________
//
export type LikeItemProps = {
  item: MyLike;
};
// ___________________________________________________________________________
//
export const LikeItem: React.VFC<LikeItemProps> = ({ item }) => {
  const postType = {
    Comment: 'コメント',
    Note: 'ノート',
    Talk: 'トーク',
  };
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center justify-between py-3 my-1 border-b border-gray-200'>
      <div className='mr-2'>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center'>
            <Avatar size='sm' src={item.user.avatar_small_url} alt={item.user.name} />
          </div>
          <div className='text-xs text-gray-600'>
            <span className='text-sm font-semibold text-gray-800'>{item.user.name}</span>の
            {postType[item.post_type]}
          </div>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <Link href={item.shortlink_path}>
            <a className='text-base font-semibold text-gray-800 break-all line-clamp-1'>
              {item.title}
            </a>
          </Link>
        </div>

        <div className='flex items-center mt-2 space-x-2'>
          <Time size='xs' date={new Date(item.posted_at)} suffix='に投稿' />
          <div className='flex items-center text-xs text-red-400'>
            <BiHeart className='mr-0.5 text-base' />
            {item.liked_count}
          </div>
        </div>
      </div>

      {item.space && (
        <Link href={`/spaces/${item.space.slug}`}>
          <a className='flex items-center justify-center w-16 h-16 p-3 mr-1 transition duration-500 rounded-lg shadow-md hover:shadow-xl bg-primary-100 hover:-translate-y-1.5 ring-1 ring-primary-100 shrink-0'>
            <Emoji emoji={item.space.emoji} size={40} />
          </a>
        </Link>
      )}
    </div>
  );
};
