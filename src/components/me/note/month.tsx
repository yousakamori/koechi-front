import { format, isSameDay } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { MonthData } from './calendar-list';
import { DayGrid } from './day-grid';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type MonthProps = {
  monthData: MonthData[];
  notes?: Note[];
};
// ___________________________________________________________________________
//
export const Month: React.VFC<MonthProps> = ({ monthData, notes }) => {
  const router = useRouter();

  const filterByDate = (date: Date) =>
    notes ? notes.filter((note) => isSameDay(new Date(note.posted_at), date)) : [];

  const handleClickDayGrid = (date: Date) => {
    router.push(`/me/day/${format(date, 'yyyy/M/d')}`, undefined, {
      scroll: false,
    });
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      {monthData.length > 0 && (
        <div className='overflow-hidden border border-gray-200 rounded-md'>
          <div className='grid grid-cols-7 gap-px text-xs leading-6 text-center text-gray-400 bg-gray-200 border-b border-gray-200'>
            {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
              <div key={i} className='py-1.5 bg-white'>
                {day}
              </div>
            ))}
          </div>
          <div className='flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto'>
            <div className='grid w-full grid-cols-7 grid-rows-6 gap-px'>
              {monthData.map((day) => (
                <DayGrid
                  notes={filterByDate(day.date)}
                  key={format(day.date, 'yyyy-MM-dd')}
                  day={day}
                  onClickDayGrid={handleClickDayGrid}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
