import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import {
  addDays,
  addMonths,
  format,
  startOfMonth,
  subDays,
  subMonths,
  getUnixTime,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronDown,
  BiDotsHorizontalRounded,
} from 'react-icons/bi';
import { CreateNoteModalProps } from '@/components/overlays/create-note-modal';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Typography } from '@/components/ui/typography';
import { useToggle } from '@/hooks/toggle';
// ___________________________________________________________________________
//
const CreateNoteModal = dynamic<CreateNoteModalProps>(() =>
  import('@/components/overlays/create-note-modal').then((mod) => mod.CreateNoteModal),
);
// ___________________________________________________________________________
//
export type NoteHeaderProps = {
  type: string;
  displayDate: Date;
  onChangeDate?: (date: Date) => void;
};
// ___________________________________________________________________________
//
export const NoteHeader: React.VFC<NoteHeaderProps> = ({ type, displayDate, onChangeDate }) => {
  const isListView = type === 'list';
  const today = new Date();
  const [open, toggleModal] = useToggle();

  const handleClickToday = () => {
    if (!onChangeDate) {
      return;
    }

    onChangeDate(today);
  };

  const handleClickLast = () => {
    if (!onChangeDate) {
      return;
    }

    let date: Date = subMonths(startOfMonth(displayDate), 1);

    if (type === 'day') {
      date = subDays(displayDate, 1);
    }

    onChangeDate(date);
  };

  const handleClickNext = () => {
    if (!onChangeDate) {
      return;
    }

    let date: Date = addMonths(startOfMonth(displayDate), 1);

    if (type === 'day') {
      date = addDays(displayDate, 1);
    }

    onChangeDate(date);
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <CreateNoteModal open={open} onClose={toggleModal} postedAt={getUnixTime(displayDate)} />

      <header className='relative z-20 flex items-center justify-between flex-none py-4'>
        <div>
          {isListView ? (
            <Typography variant='h1' fontSize='xl'>
              ノート一覧
            </Typography>
          ) : (
            <>
              <Typography variant='h1' fontSize='lg'>
                <time dateTime={format(displayDate, 'yyyy-MM-dd')}>
                  {format(displayDate, 'yyyy月MM日dd日')}
                </time>
              </Typography>
              <p className='mt-1 text-sm text-gray-500'>
                {format(displayDate, 'EEEE', { locale: ja })}
              </p>
            </>
          )}
        </div>

        <div className='flex items-center'>
          {!isListView && (
            <div className='flex items-center rounded-full shadow md:items-stretch'>
              <button
                onClick={handleClickLast}
                type='button'
                className='flex items-center justify-center py-2 pl-4 pr-4 text-gray-400 bg-white border border-r-0 rounded-l-full border-secondary-300 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-secondary-50'
              >
                <span className='sr-only'>先月</span>
                <BiChevronLeft className='w-5 h-5' aria-hidden='true' />
              </button>
              <button
                onClick={handleClickToday}
                type='button'
                className='hidden border-t border-b border-secondary-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-secondary-50 hover:text-gray-900 focus:relative md:block'
              >
                今日
              </button>
              <span className='relative w-px h-5 -mx-px bg-gray-300 md:hidden' />
              <button
                onClick={handleClickNext}
                type='button'
                className='flex items-center justify-center py-2 pl-4 pr-4 text-gray-400 bg-white border border-l-0 rounded-r-full border-secondary-300 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-secondary-50'
              >
                <span className='sr-only'>翌月</span>
                <BiChevronRight className='w-5 h-5' aria-hidden='true' />
              </button>
            </div>
          )}

          <div className='hidden md:ml-4 md:flex md:items-center'>
            <Dropdown
              position='right'
              className='w-36'
              buttonContent={
                <Menu.Button as={React.Fragment}>
                  <Button variant='outlined' color='secondary' className='' roundedFull>
                    表示
                    <BiChevronDown className='w-5 h-5 ml-2 text-gray-400' aria-hidden='true' />
                  </Button>
                </Menu.Button>
              }
            >
              <div>
                <Menu.Item>
                  <Link href={'/me'}>
                    <a
                      className={clsx(
                        type === 'list' ? 'text-primary-500' : 'text-gray-500',
                        'block px-4 py-3 text-sm hover:bg-gray-100',
                      )}
                    >
                      リスト
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={`/me/day/${format(displayDate, 'yyyy/M/d')}`}>
                    <a
                      className={clsx(
                        type === 'day' ? 'text-primary-500' : 'text-gray-500',
                        'block px-4 py-3 text-sm hover:bg-gray-100',
                      )}
                    >
                      日
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={`/me/month/${format(displayDate, 'yyyy/M/d')}`}>
                    <a
                      className={clsx(
                        type === 'month' ? 'text-primary-500' : 'text-gray-500',
                        'block px-4 py-3 text-sm hover:bg-gray-100',
                      )}
                    >
                      月
                    </a>
                  </Link>
                </Menu.Item>
              </div>
            </Dropdown>

            <div className='w-px h-6 ml-6 bg-gray-300' />

            <Button onClick={toggleModal} variant='outlined' className='ml-6' roundedFull>
              ノートを作成
            </Button>
          </div>

          <div className='ml-6 md:hidden'>
            <Dropdown
              position='right'
              className='w-36'
              buttonContent={
                <Menu.Button className='flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500'>
                  <span className='sr-only'>メニューを開く</span>
                  <BiDotsHorizontalRounded className='w-5 h-5' aria-hidden='true' />
                </Menu.Button>
              }
            >
              <>
                <div>
                  <Menu.Item>
                    <button
                      onClick={toggleModal}
                      className='w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      ノートを作成
                    </button>
                  </Menu.Item>
                </div>
                {!isListView && (
                  <div>
                    <Menu.Item>
                      <button
                        onClick={handleClickToday}
                        type='button'
                        className='w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                      >
                        今日
                      </button>
                    </Menu.Item>
                  </div>
                )}
                <div>
                  <Menu.Item>
                    <Link href={'/me'}>
                      <a
                        className={clsx(
                          type === 'list' ? 'text-primary-500' : 'text-gray-500',
                          'block px-4 py-3 text-sm hover:bg-gray-100',
                        )}
                      >
                        リスト
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/me/day/${format(displayDate, 'yyyy/M/d')}`}>
                      <a
                        className={clsx(
                          type === 'day' ? 'text-primary-500' : 'text-gray-500',
                          'block px-4 py-3 text-sm hover:bg-gray-100',
                        )}
                      >
                        日
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/me/month/${format(displayDate, 'yyyy/M/d')}`}>
                      <a
                        className={clsx(
                          type === 'month' ? 'text-primary-500' : 'text-gray-500',
                          'block px-4 py-3 text-sm hover:bg-gray-100',
                        )}
                      >
                        月
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
              </>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};
