import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import {
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameDay,
  isToday,
  startOfMonth,
  isSameMonth,
  subMonths,
} from 'date-fns';
import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
// ___________________________________________________________________________
//
type DateCellProps = {
  date: number;
  isToday: boolean;
  isSameMonth: boolean;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};
// ___________________________________________________________________________
//
const DateCell: React.VFC<DateCellProps> = ({
  date,
  isToday,
  isSameMonth,
  isSelected,
  onClick,
}) => {
  const cellClasses = () => {
    if (isSelected) {
      return 'text-white bg-primary-400 border-transparent';
    }

    if (isToday) {
      return 'text-primary-400 border-dashed border-primary-400 hover:border-solid';
    }

    return 'text-gray-700 border-transparent';
  };

  const baseClasses = clsx(
    'w-6',
    'h-6',
    'p-3.5',
    'flex',
    'items-center',
    'justify-center',
    'text-sm',
  );

  const buttonClasses = clsx(
    baseClasses,
    'border',
    'outline-none',
    'focus:outline-none',
    'rounded-full',
    'hover:border-primary-400',
    cellClasses(),
  );

  const paragraphClasses = clsx(baseClasses, 'text-gray-300');
  // ___________________________________________________________________________
  //
  return (
    <>
      {isSameMonth ? (
        <button type='button' className={buttonClasses} onClick={onClick}>
          {date}
        </button>
      ) : (
        <p className={paragraphClasses}>{date}</p>
      )}
    </>
  );
};
// ___________________________________________________________________________
//
export type DaysProps = {
  currentDate: Date;
  handleSelectDate: (date: Date) => void;
  handleClose: () => void;
};
// ___________________________________________________________________________
//
export const Days: React.VFC<DaysProps> = ({ currentDate, handleSelectDate, handleClose }) => {
  const [displayDate, setDisplayDate] = useState(currentDate);

  const days = () => {
    const sundays = eachWeekOfInterval({
      start: startOfMonth(displayDate),
      end: endOfMonth(displayDate),
    });

    return sundays.map((sunday) => eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) }));
  };

  const dropDownDate = () => {
    return eachMonthOfInterval({
      start: subMonths(displayDate, 4),
      end: addMonths(displayDate, 5),
    });
  };

  const handleSelectToday = () => {
    const today = new Date();
    setDisplayDate(today);
    handleSelectDate(today);
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <div className='flex items-center justify-between'>
        <CircleButton
          type='button'
          size='sm'
          color='secondary'
          onClick={() => setDisplayDate(subMonths(displayDate, 1))}
        >
          <BiChevronLeft />
        </CircleButton>
        <Dropdown
          position='center'
          className='w-36'
          buttonContent={
            <Menu.Button as={React.Fragment}>
              <Button
                type='button'
                color='secondary'
                variant='ghost'
                className='flex items-center px-4 py-2 space-x-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100'
              >
                {format(displayDate, 'y年 M月')}
              </Button>
            </Menu.Button>
          }
        >
          <div className='overflow-y-scroll h-72'>
            {dropDownDate().map((date, k) => (
              <Menu.Item key={k}>
                <button
                  onClick={() => setDisplayDate(date)}
                  className={`block w-full px-4 py-3 text-sm text-left ${
                    isSameMonth(displayDate, date)
                      ? 'text-primary-500 hover:bg-primary-100'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {format(date, 'yyyy年 MM月')}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Dropdown>

        <CircleButton
          type='button'
          size='sm'
          color='secondary'
          onClick={() => setDisplayDate(addMonths(displayDate, 1))}
        >
          <BiChevronRight />
        </CircleButton>
      </div>

      <div className='mt-6'>
        <div className='flex flex-wrap items-center justify-between mb-3'>
          {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
            <div
              key={i}
              className='flex items-center justify-center w-6 h-6 p-3.5 text-sm text-center text-gray-400'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='space-y-2'>
          {days().map((weekRow, rowNum) => (
            <div className='flex flex-wrap items-center justify-between' key={rowNum}>
              {weekRow.map((date) => (
                <DateCell
                  key={getDate(date)}
                  date={getDate(date)}
                  isToday={isToday(date)}
                  isSameMonth={isSameMonth(date, displayDate)}
                  isSelected={isSameDay(date, new Date(currentDate))}
                  onClick={() => handleSelectDate(date)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-center mt-6 space-x-3'>
        <Button
          type='button'
          color='primary'
          size='sm'
          variant='outlined'
          onClick={handleSelectToday}
        >
          今日
        </Button>

        <Button type='button' color='secondary' size='sm' variant='outlined' onClick={handleClose}>
          閉じる
        </Button>
      </div>
    </>
  );
};
