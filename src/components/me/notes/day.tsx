import Link from 'next/link';
import React from 'react';
import { MonthNav } from './month-nav';
import { Avatar } from '@/components/ui/avatar';
import { Emoji } from '@/components/ui/emoji';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type DayProps = {
  notes: Note[];
  loading: boolean;
  displayDate: Date;
  onChangeDate: (date: Date) => void;
};
// ___________________________________________________________________________
//
export const Day: React.VFC<DayProps> = ({ notes, loading, displayDate, onChangeDate }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='flex flex-auto overflow-hidden bg-white'>
      <div className='flex flex-col flex-auto overflow-auto'>
        {/* list */}
        {loading ? (
          <div className='mt-6'>
            <Spinner color='primary' size='md' />
          </div>
        ) : notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <div key={note.id} className='flex items-center py-3'>
                <Link href={`/spaces/${note.space.slug}`}>
                  <a className='flex items-center justify-center w-16 mr-3 h-16 p-3 transition duration-500 rounded-lg shadow-md hover:shadow-xl bg-primary-100 hover:-translate-y-1.5 ring-1 ring-primary-100 shrink-0'>
                    <Emoji emoji={note.space.emoji} size={40} />
                  </a>
                </Link>

                <div className='flex-1'>
                  <Link href={`/notes/${note.slug}`}>
                    <a>
                      <p className='text-sm font-semibold text-gray-700 break-all line-clamp-1'>
                        {note.title}
                      </p>
                      <p className='mt-1 text-xs font-semibold text-gray-500 break-all line-clamp-1'>
                        {note.body_text}
                      </p>
                    </a>
                  </Link>

                  <div className='flex items-center mt-1'>
                    <Avatar size='xs' src={note.user.avatar_small_url} alt={note.user.name} />
                    <div className='ml-1 text-xs font-semibold text-gray-800'>{note.user.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Typography color='textSecondary' fontSize='lg' align='center'>
              ノートはありません
            </Typography>
            <div className='w-full mt-6'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className='mx-auto' src='/images/empty.svg' width='240' height='173' alt='' />
            </div>
          </>
        )}
      </div>

      <div className='flex-none hidden w-1/2 max-w-md px-8 py-10 md:block'>
        <MonthNav displayDate={displayDate} onChangeDate={onChangeDate} />
      </div>
    </div>
  );
};
