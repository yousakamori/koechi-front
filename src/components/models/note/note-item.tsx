import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiPencil, BiChevronDown, BiTime, BiMessageRounded } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { ConfirmModal } from '@/components/overlays/confirm-modal';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { EmojiOrTwemoji } from '@/components/ui/emoji-or-twemoji';
import { Time } from '@/components/ui/time';
import { useToggle } from '@/hooks/toggle';
import { SITE_URL } from '@/lib/constants';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type NoteItemProps = {
  note: Note;
  emoji?: boolean;
  className?: string;
  onDeleteNote?: (slug: string) => Promise<void>;
};
// ___________________________________________________________________________
//
export const NoteItem: React.VFC<NoteItemProps> = ({
  note,
  emoji = true,
  className,
  onDeleteNote,
}) => {
  const [open, toggleModal] = useToggle();
  // ___________________________________________________________________________
  //
  return (
    <>
      {onDeleteNote && (
        <ConfirmModal
          title='削除しますか？'
          description={`「${note.title}」を完全に削除しますか？この操作は戻すことができません。`}
          open={open}
          onConfirm={() => onDeleteNote(note.slug)}
          onClose={toggleModal}
        />
      )}

      <div className={clsx('py-4', className)}>
        <div className='flex items-center'>
          {emoji && (
            <Link href={`/spaces/${note.space.slug}`}>
              <a className='flex items-center justify-center w-16 h-16 p-3 mr-1 transition duration-500 rounded-lg shadow-md hover:shadow-xl bg-primary-100 hover:-translate-y-1.5 ring-1 ring-primary-100 shrink-0'>
                <EmojiOrTwemoji className='text-4xl' emoji={note.space.emoji} />
              </a>
            </Link>
          )}

          <div className='flex-1 ml-4'>
            <div className='flex items-center justify-between'>
              <Link href={`/notes/${note.slug}`}>
                <a>
                  <div className='text-base font-semibold text-gray-800 break-all line-clamp-1'>
                    {note.title}
                  </div>
                  <div className='mt-1.5 text-sm font-medium text-gray-600 line-clamp-1 break-all'>
                    {note.body_text}
                  </div>
                </a>
              </Link>

              {onDeleteNote && (
                <div className='flex items-center ml-3 sm:ml-10'>
                  {(note.is_mine || note.space.role === 'admin') && (
                    <Link href={`/notes/${note.slug}/edit`} passHref>
                      <CircleButton size='md' variant='ghost' color='secondary'>
                        <BiPencil className='text-lg' />
                      </CircleButton>
                    </Link>
                  )}
                  <Dropdown
                    position='right'
                    className='w-36'
                    buttonContent={
                      <Menu.Button as={React.Fragment}>
                        <CircleButton variant='none' color='secondary' aria-label='メニューを開く'>
                          <BiChevronDown />
                        </CircleButton>
                      </Menu.Button>
                    }
                  >
                    <div>
                      <CopyToClipboard
                        text={`${SITE_URL}/notes/${note.slug}`}
                        onCopy={() => toast.success('URLをコピーしました')}
                      >
                        <Menu.Item>
                          <button className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'>
                            URLをコピー
                          </button>
                        </Menu.Item>
                      </CopyToClipboard>
                      {(note.is_mine || note.space.role === 'admin') && (
                        <Menu.Item>
                          <button
                            onClick={toggleModal}
                            className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                          >
                            削除する
                          </button>
                        </Menu.Item>
                      )}
                    </div>
                  </Dropdown>
                </div>
              )}
            </div>

            <footer className='mt-2'>
              <div className='flex items-center space-x-3'>
                <div className='shrink-0'>
                  <Avatar size='sm' src={note.user.avatar_small_url} alt={note.user.name} />
                </div>
                <div className='ml-1'>
                  <Link href={`/${note.user.username}`}>
                    <a className='block text-sm text-gray-800 line-clamp-1'>{note.user.name}</a>
                  </Link>

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
    </>
  );
};
