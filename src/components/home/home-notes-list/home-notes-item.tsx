import Link from 'next/link';
import React from 'react';
import { BiTime, BiMessageRounded } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { Emoji } from '@/components/ui/emoji';
import { Time } from '@/components/ui/time';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type HomeNoteItemProps = {
  note: Note;
};
// ___________________________________________________________________________
//
export const HomeNoteItem: React.VFC<HomeNoteItemProps> = ({ note }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='py-3 my-1 border-b border-gray-200'>
      <div className='flex items-center'>
        <Link href={`/spaces/${note.space.slug}`}>
          <a className='flex items-center justify-center w-16 h-16 p-3 mr-1 transition duration-500 rounded-lg shadow-md hover:shadow-xl bg-primary-100 hover:-translate-y-1.5 ring-1 ring-primary-100 shrink-0'>
            <Emoji emoji={note.space.emoji} size={40} />
          </a>
        </Link>

        <div className='flex-1 ml-4'>
          <div className='flex items-center justify-between'>
            <Link href={`/notes/${note.slug}`}>
              <a>
                <div className='text-sm font-semibold text-gray-800 break-all line-clamp-1'>
                  {note.title}
                </div>
                <div className='mt-1.5 text-sm font-medium text-gray-600 line-clamp-1 break-all'>
                  {note.body_text}
                </div>
              </a>
            </Link>
          </div>

          <footer className='mt-2'>
            <div className='flex items-center space-x-3'>
              <div className='flex items-center'>
                <Avatar size='sm' src={note.user.avatar_small_url} alt={note.user.name} />
              </div>
              <div className='ml-1'>
                <div className='text-xs font-semibold text-gray-800'>{note.user.name}</div>

                <div className='flex items-center space-x-3 text-gray-500'>
                  <div className='flex items-center text-sm'>
                    <BiTime className='mr-1' />
                    <Time
                      size='xs'
                      format='yyyy年MM月dd日'
                      suffix='の投稿'
                      date={new Date(note.posted_at)}
                    />
                  </div>
                  {note.comments_count > 0 && (
                    <div className='flex items-center text-sm'>
                      <BiMessageRounded className='mr-1' />
                      <div className='text-xs'>{note.comments_count}</div>
                    </div>
                  )}
                  <div className='hidden text-xs sm:block'>{note.body_letters_count}字</div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
