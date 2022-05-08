import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { AvatarGroup } from '@/components/avatar-group';
import { LikeButtonProps } from '@/components/models/like';
import { Avatar } from '@/components/ui/avatar';
import { Container } from '@/components/ui/container';
import { Participant } from '@/types/participant';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
const LikeButton = dynamic<LikeButtonProps>(() =>
  import('@/components/models/like').then((mod) => mod.LikeButton),
);
// ___________________________________________________________________________
//
export type TalkNavProps = {
  talk: TalkDetails;
  participants: Participant[];
};
// ___________________________________________________________________________
//
export const TalkNav: React.VFC<TalkNavProps> = ({ talk, participants }) => {
  return (
    <div className='sticky top-0 z-20 bg-white border-t border-b border-secondary-200 lg:hidden'>
      <Container>
        <div className='flex items-center justify-between space-x-6 h-14 sm:space-x-8'>
          <Link href={`/${talk.user.username}`}>
            <a className='flex items-center'>
              <span>
                <Avatar src={talk.user.avatar_small_url} />
              </span>
              <span className='ml-1 text-sm font-semibold text-gray-800'>{talk.user.name}</span>
            </a>
          </Link>

          <div className='flex items-center'>
            {participants.length > 0 && <AvatarGroup participants={participants} />}

            <LikeButton
              className='ml-2'
              size='md'
              liked={talk.current_user_liked}
              likableId={talk.id}
              likedCount={talk.liked_count}
              likableType='Talk'
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
