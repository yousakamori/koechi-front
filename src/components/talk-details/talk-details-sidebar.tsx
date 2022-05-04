import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsTwitter, BsFacebook } from 'react-icons/bs';
import { FollowButton } from '@/components/follow-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CircleButton } from '@/components/ui/button';
import { LikeButtonProps } from '@/components/ui/like-button';
import { Participant } from '@/types/participant';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
const LikeButton = dynamic<LikeButtonProps>(() =>
  import('@/components/ui/like-button').then((mod) => mod.LikeButton),
);
// ___________________________________________________________________________
//
export type TalkDetailsSidebarProps = {
  talk: TalkDetails;
  isMine: boolean;
  participants: Participant[];
  onUpdateTalk: (values: TalkDetails) => Promise<void>;
};
// ___________________________________________________________________________
//
export const TalkDetailsSidebar: React.VFC<TalkDetailsSidebarProps> = React.memo(
  ({ talk, isMine, participants, onUpdateTalk }) => {
    const handleOpenTalk = async () => {
      await onUpdateTalk({ ...talk, closed: false, closed_at: null });
    };

    const handleCloseTalk = async () => {
      await onUpdateTalk({ ...talk, closed: true, closed_at: new Date().toISOString() });
    };
    // ___________________________________________________________________________
    //
    return (
      <>
        {isMine && (
          <div className='w-full p-4 bg-white border-t border-gray-200 first:border-t-0 sm:w-[48%] lg:w-full'>
            {talk.closed_at ? (
              <div className='flex items-center justify-between'>
                <span className='inline-flex items-center text-sm font-semibold text-gray-800'>
                  <BiCheck className='mr-1 text-lg text-blue-400' />
                  {format(new Date(talk.closed_at), 'yyyy/MM/dd')}
                  に閉じられました
                </span>
                <Button size='sm' onClick={handleOpenTalk} color='secondary' variant='outlined'>
                  開く
                </Button>
              </div>
            ) : (
              <Button onClick={handleCloseTalk} color='secondary' variant='outlined' fullWidth>
                <BiCheck className='mr-1 text-lg text-blue-400' />
                <span className='font-bold'>トークを閉じる</span>
              </Button>
            )}
          </div>
        )}

        <div className='w-full p-4 bg-white border-t border-gray-200 first:border-t-0 sm:w-[48%] lg:w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
              <LikeButton
                size='lg'
                likableId={talk.id}
                likableType='Talk'
                likedCount={talk.liked_count}
              />
            </div>
            <div className='flex items-center justify-between space-x-3'>
              <CircleButton color='secondary' size='md'>
                <BsTwitter />
              </CircleButton>
              <CircleButton color='secondary' size='md'>
                <BsFacebook />
              </CircleButton>
            </div>
          </div>
        </div>
        <div className='w-full p-4 bg-white border-t border-gray-200 first:border-t-0 sm:w-[48%] lg:w-full'>
          <div className='flex items-center space-x-3'>
            <Link href={`/${talk.user.username}`}>
              <a className='flex-shrink-0'>
                <Avatar src={talk.user.avatar_small_url} size='lg' />
              </a>
            </Link>
            <div>
              <Link href={`/${talk.user.username}`}>
                <a className='inline-block font-semibold line-clamp-1'>{talk.user.name}</a>
              </Link>
              {!isMine && (
                <div className='block mt-1'>
                  <FollowButton userId={talk.user.id} />
                </div>
              )}
            </div>
          </div>
          <div
            className='prose prose-sky max-w-none'
            dangerouslySetInnerHTML={{
              __html: talk.user.autolinked_bio,
            }}
          />
        </div>
        {participants.length > 0 && (
          <div className='w-full p-4 bg-white border-t border-gray-200 first:border-t-0 sm:w-[48%] lg:w-full'>
            <p className='text-sm font-semibold text-gray-500'>{participants.length}人がコメント</p>
            <div className='flex flex-wrap items-center'>
              {participants.map((participant) => (
                <Link key={participant.id} href={`/${participant.username}`}>
                  <a className='mt-2 mr-2'>
                    <Avatar src={participant.avatar_small_url} size='sm' />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </>
    );
  },
);
// ___________________________________________________________________________
//
TalkDetailsSidebar.displayName = 'TalkDetailsSidebar';