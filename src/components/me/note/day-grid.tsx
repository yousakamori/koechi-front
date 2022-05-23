import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { MonthData } from './calendar-list';
import { Emoji } from '@/components/ui/emoji';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type DayGridProps = {
  day: MonthData;
  notes: Note[];
  onClickDayGrid: (v: Date) => void;
};
// ___________________________________________________________________________
//
const DISPLAY_NOTE_COUNT = 4;
// ___________________________________________________________________________
//
export const DayGrid: React.VFC<DayGridProps> = ({
  day: { date, isCurrentMonth, isToday },
  notes,
  onClickDayGrid,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      {/* cell xs~md */}
      <button
        onClick={() => onClickDayGrid(date)}
        type='button'
        className={clsx(
          isCurrentMonth ? 'bg-white' : 'bg-gray-50',
          isToday && 'font-semibold text-white',
          isCurrentMonth && !isToday && 'text-gray-900',
          !isCurrentMonth && !isToday && 'text-gray-500',
          notes.length === 0 && 'cursor-default',
          'lg:hidden min-h-20 flex flex-col py-2 px-3 focus:z-10',
        )}
      >
        <time
          dateTime={format(date, 'yyyy-MM-dd')}
          className={clsx(isToday && 'bg-primary-400', 'h-6 w-6 mx-auto rounded-full')}
        >
          {format(date, 'd')}
        </time>

        <div className='-mx-0.5 flex flex-wrap'>
          {notes.slice(0, DISPLAY_NOTE_COUNT).map((note) => (
            <div key={note.id} className='mx-0.5 my-1 h-1.5 w-1.5 rounded-full bg-gray-400' />
          ))}
        </div>

        {notes.length > DISPLAY_NOTE_COUNT && (
          <div className='leading-3 text-gray-500 hover:text-gray-600'>…</div>
        )}
      </button>

      {/* cell lg~ */}
      <div
        className={`min-h-28 ${clsx(
          isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
          'hidden lg:block relative py-2 px-3',
        )}`}
      >
        <button
          onClick={() => onClickDayGrid(date)}
          className={clsx(
            isToday && 'bg-primary-400 font-semibold text-white',
            notes.length === 0 && 'cursor-default',
            'p-1 hover:border hover:border-primary-400 flex h-6 w-6  items-center justify-center rounded-full',
          )}
        >
          {format(date, 'd')}
        </button>

        {notes.length > 0 && (
          <div className='mt-1'>
            {notes.slice(0, 2).map((note) => (
              <div key={note.id}>
                <Link href={`/notes/${note.slug}`} prefetch={false}>
                  <a className='flex items-center group'>
                    <div className='flex items-center mr-1.5 leading-4 shrink-0'>
                      <Emoji emoji={note.space.emoji} size={12} />
                    </div>
                    <p className='flex-auto font-medium text-gray-900 truncate group-hover:text-primary-500'>
                      {note.title}
                    </p>
                  </a>
                </Link>
              </div>
            ))}
            {notes.length > 2 && (
              <div className='text-gray-500 hover:text-gray-600'>
                <button onClick={() => onClickDayGrid(date)}>他 {notes.length - 2} 件</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
