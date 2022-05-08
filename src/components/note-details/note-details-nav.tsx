import Link from 'next/link';
import React from 'react';
import { AvatarGroup } from '@/components/avatar-group';
import { LikeButton } from '@/components/models/like';
import { Avatar } from '@/components/ui/avatar';
import { Container } from '@/components/ui/container';
import { NoteDetails } from '@/types/note';
import { Participant } from '@/types/participant';
// ___________________________________________________________________________
//
export type NoteDetailsNavProps = {
  note: NoteDetails;
  participants: Participant[];
};
// ___________________________________________________________________________
//
export const NoteDetailsNav: React.VFC<NoteDetailsNavProps> = ({ note, participants }) => {
  return (
    <div className='sticky top-0 z-20 bg-white border-t border-b border-secondary-200'>
      <Container>
        <div className='flex items-center justify-between space-x-6 h-14 sm:space-x-8'>
          <Link href={`/${note.user.username}`}>
            <a className='flex items-center'>
              <span>
                <Avatar src={note.user.avatar_small_url} />
              </span>
              <span className='ml-1 text-sm font-semibold text-gray-800'>{note.user.name}</span>
            </a>
          </Link>

          <div className='flex items-center'>
            {participants.length > 0 && (
              <button className='flex items-center'>
                <AvatarGroup participants={participants} />
              </button>
            )}

            <LikeButton
              className='ml-2'
              size='md'
              liked={note.current_user_liked}
              likableId={note.id}
              likedCount={note.liked_count}
              likableType='Note'
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
