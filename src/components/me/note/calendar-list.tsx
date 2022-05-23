import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isToday,
  startOfMonth,
  isSameMonth,
  startOfWeek,
  lastDayOfWeek,
  addWeeks,
  getWeeksInMonth,
  getUnixTime,
} from 'date-fns';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Day } from './day';
import { Month } from './month';
import { NoteHeader } from './note-header';
import { Spinner } from '@/components/ui/spinner';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
const MAX_ROW = 6;
// ___________________________________________________________________________
//
export type MonthData = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  notes: Note[];
};

export type CalendarListProps = {
  type?: string;
  date: Date;
};
// ___________________________________________________________________________
//
export const CalendarList: React.VFC<CalendarListProps> = React.memo(({ type = 'month', date }) => {
  const today = new Date();
  const router = useRouter();
  const [displayDate, setDisplayDate] = useState<Date>();
  const [term, setTerm] = useState<{ start: number; end: number }>();
  const [monthData, setMonthData] = useState<MonthData[]>([]);

  const handleClickMonth = (date: Date) => {
    router.push(`/me/${type}/${format(date, 'yyyy/M/d')}`, undefined, {
      scroll: false,
    });

    setDisplayDate(date);
  };

  const { data, error } = useSWR<{ notes: Note[] }, HttpError>(
    term ? `${endpoints.notesTerm}?start=${term.start}&end=${term.end}` : null,
    fetchApi,
  );

  const isLoadingData = !data && !error;

  const getMonthWeeks = async (date: Date) => {
    const startDate = startOfMonth(date);
    const start = startOfWeek(startDate);
    const end = addWeeks(lastDayOfWeek(endOfMonth(date)), MAX_ROW - getWeeksInMonth(startDate));
    const days = eachDayOfInterval({ start, end });

    setTerm({ start: getUnixTime(start), end: getUnixTime(end) });

    setMonthData(
      days.map((day) => ({
        date: day,
        isCurrentMonth: isSameMonth(day, date),
        isToday: isToday(day),
        notes: [],
      })),
    );
  };

  const filterByDate = (date: Date) =>
    data ? data.notes.filter((note) => isSameDay(new Date(note.posted_at), date)) : [];

  useEffect(() => {
    if (!displayDate) {
      return;
    }

    getMonthWeeks(displayDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayDate]);

  useEffect(() => {
    const isValidDate = (date: Date) => !Number.isNaN(date.getTime());

    if (isValidDate(date)) {
      setDisplayDate(date);
      return;
    }

    setDisplayDate(today);
    router.push(`/me/${type}/${format(today, 'yyyy/M/d')}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  // ___________________________________________________________________________
  //
  if (!displayDate) {
    return (
      <div className='mt-6'>
        <Spinner color='primary' size='md' />
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  if (type === 'day') {
    return (
      // day
      <>
        <NoteHeader type={type} displayDate={displayDate} onChangeDate={handleClickMonth} />
        <Day
          notes={filterByDate(displayDate)}
          loading={isLoadingData}
          displayDate={displayDate}
          onChangeDate={handleClickMonth}
        />
      </>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    // month
    <div className='mt-6'>
      <NoteHeader type={type} displayDate={displayDate} onChangeDate={handleClickMonth} />
      <Month notes={data?.notes} monthData={monthData} />
    </div>
  );
});
// ___________________________________________________________________________
//
CalendarList.displayName = 'CalendarList';
