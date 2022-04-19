import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiPencil, BiChevronDown, BiTime, BiMessageRounded } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { ConfirmModalProps } from '@/components/common/modals/confirm-modal';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Time } from '@/components/ui/time';
import { useToggle } from '@/hooks/toggle';
import { SITE_URL } from '@/lib/constants';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
const ConfirmModal = dynamic<ConfirmModalProps>(() =>
  import('@/components/common/modals/confirm-modal').then((mod) => mod.ConfirmModal),
);
// ___________________________________________________________________________
//
export type SpaceNotesItemProps = {
  note: Note;
  role: Role;
  onDeleteNote: (slug: string) => Promise<void>;
};
// ___________________________________________________________________________
//
export const SpaceNotesItem: React.VFC<SpaceNotesItemProps> = ({ note, role, onDeleteNote }) => {
  const [open, toggleModal] = useToggle();

  const handleDeleteNote = async () => {
    await onDeleteNote(note.slug);
    toggleModal();
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <ConfirmModal
        title='削除しますか？'
        description={`「${note.title}」を完全に削除しますか？この操作は戻すことができません。`}
        open={open}
        onConfirm={handleDeleteNote}
        onClose={toggleModal}
      />

      <div className='py-3 my-1 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <Link href={`/notes/${note.slug}`}>
            <a>
              <div className='text-base font-semibold text-gray-800 break-all line-clamp-1'>
                {note.title}
              </div>
              <div className='mt-1.5 text-sm font-medium text-gray-600 line-clamp-2 break-all'>
                {note.body_text}
              </div>
            </a>
          </Link>

          <div className='flex items-center ml-3 sm:ml-10'>
            {(note.is_mine || role === 'admin') && (
              <div className='mr-2 rounded-full bg-secondary-100 hover:bg-primary-100'>
                <Link href={`/notes/${note.slug}/edit`} passHref>
                  <CircleButton size='md' variant='none' color='secondary'>
                    <BiPencil className='text-lg' />
                  </CircleButton>
                </Link>
              </div>
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

                {(note.is_mine || role === 'admin') && (
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
                <div className='text-xs'>{note.body_letters_count}字</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
