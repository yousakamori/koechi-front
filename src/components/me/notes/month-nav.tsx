import clsx from 'clsx';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isToday,
  startOfMonth,
  isSameMonth,
  subMonths,
  startOfWeek,
  lastDayOfWeek,
  addWeeks,
  getWeeksInMonth,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
// ___________________________________________________________________________
//
const MAX_ROW = 6;
// ___________________________________________________________________________
//
export type MonthNavProps = {
  displayDate: Date;
  onChangeDate: (date: Date) => void;
};
// ___________________________________________________________________________
//
export const MonthNav: React.VFC<MonthNavProps> = ({ displayDate, onChangeDate }) => {
  const today = new Date();
  const [pickerDate, setPickerDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const getMonthWeeks = () => {
    const startDate = startOfMonth(pickerDate);
    const start = startOfWeek(startDate);
    const end = addWeeks(
      lastDayOfWeek(endOfMonth(pickerDate)),
      MAX_ROW - getWeeksInMonth(startDate),
    );

    return eachDayOfInterval({ start, end });
  };

  const handleClickPrevMonth = () => setPickerDate((prev) => subMonths(prev, 1));
  const handleClickNextMonth = () => setPickerDate((prev) => addMonths(prev, 1));
  const handleClickDay = (day: Date) => {
    setSelectedDate(day);
    onChangeDate(day);
  };

  useEffect(() => {
    setPickerDate(displayDate);
    setSelectedDate(displayDate);
  }, [displayDate]);

  // ___________________________________________________________________________
  //
  return (
    <>
      <div className='flex items-center text-center text-gray-900'>
        <button
          onClick={handleClickPrevMonth}
          type='button'
          className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
        >
          <span className='sr-only'>先月</span>
          <BiChevronLeft className='w-5 h-5' aria-hidden='true' />
        </button>
        <div className='flex-auto font-semibold'>{format(pickerDate, 'yyyy年MM月')}</div>
        <button
          onClick={handleClickNextMonth}
          type='button'
          className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
        >
          <span className='sr-only'>翌月</span>
          <BiChevronRight className='w-5 h-5' aria-hidden='true' />
        </button>
      </div>
      <div className='grid grid-cols-7 mt-6 text-xs leading-6 text-center text-gray-500'>
        {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-px mt-2 overflow-hidden text-sm bg-gray-200 border border-gray-200 rounded-lg'>
        {getMonthWeeks().map((day) => (
          <button
            onClick={() => handleClickDay(day)}
            key={format(day, 'yyyy-M-d')}
            type='button'
            className={clsx(
              'py-1.5 hover:bg-gray-100 focus:z-10',
              isSameMonth(day, pickerDate) ? 'bg-white' : 'bg-gray-50',
              (isSameDay(day, selectedDate) || isToday(day)) && 'font-semibold',
              isSameDay(day, selectedDate) && 'text-white',
              !isSameDay(day, selectedDate) &&
                isSameMonth(day, pickerDate) &&
                !isToday(day) &&
                'text-gray-900',
              !isSameDay(day, selectedDate) &&
                !isSameMonth(day, pickerDate) &&
                !isToday(day) &&
                'text-gray-400',
              isToday(day) && !isSameDay(day, selectedDate) && 'text-primary-500',
            )}
          >
            <time
              dateTime={format(day, 'yyyy-MM-dd')}
              className={clsx(
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                isSameDay(day, selectedDate) && isToday(day) && 'bg-primary-500',
                isSameDay(day, selectedDate) && !isToday(day) && 'bg-gray-900',
              )}
            >
              {format(day, 'd')}
            </time>
          </button>
        ))}
      </div>
    </>
  );
};
