import React from 'react';
import { MonthNav } from './month-nav';
import { NoteItem } from '@/components/models/note';
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
              <NoteItem key={note.id} note={note} />
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
