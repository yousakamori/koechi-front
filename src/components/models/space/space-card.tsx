import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { ConfirmModalProps } from '@/components/overlays/confirm-modal';
import { EditSpaceModalProps, UpdateSpace } from '@/components/overlays/edit-space-modal';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Emoji } from '@/components/ui/emoji';
import { Time } from '@/components/ui/time';
import { useToggle } from '@/hooks/toggle';
import { SITE_URL } from '@/lib/constants';
import { Space } from '@/types/space';
// ___________________________________________________________________________
//
const EditSpaceModal = dynamic<EditSpaceModalProps>(() =>
  import('@/components/overlays/edit-space-modal').then((mod) => mod.EditSpaceModal),
);

const ConfirmModal = dynamic<ConfirmModalProps>(() =>
  import('@/components/overlays/confirm-modal').then((mod) => mod.ConfirmModal),
);
// ___________________________________________________________________________
//
export type SpaceCardProps = {
  space: Space;
  validating: boolean;
  onUpdateSpace: UpdateSpace;
  onDeleteSpace: (slug: string) => void;
};
// ___________________________________________________________________________
//
export const SpaceCard: React.VFC<SpaceCardProps> = ({
  space,
  validating,
  onDeleteSpace,
  onUpdateSpace,
}) => {
  const [openEditFrom, toggleEditForm] = useToggle();
  const [openConfirm, toggleConfirm] = useToggle();
  // ___________________________________________________________________________
  //
  return (
    <>
      <EditSpaceModal
        space={space}
        validating={validating}
        open={openEditFrom}
        onClose={toggleEditForm}
        onUpdate={onUpdateSpace}
      />

      <ConfirmModal
        title='削除しますか？'
        description={`「${space.name}」を完全に削除しますか？この操作は戻すことができません。`}
        open={openConfirm}
        onConfirm={() => onDeleteSpace(space.slug)}
        onClose={toggleConfirm}
      />

      <article
        className='relative flex flex-col overflow-hidden rounded-lg shadow-lg'
        key={space.id}
      >
        {space.is_mine && (
          <div className='absolute right-1 top-1'>
            <Dropdown
              position='right'
              className='w-36'
              buttonContent={
                <Menu.Button as={React.Fragment}>
                  <CircleButton variant='none' color='secondary' aria-label='スペースを編集'>
                    <BiDotsHorizontalRounded />
                  </CircleButton>
                </Menu.Button>
              }
            >
              {!space.archived ? (
                <>
                  <Menu.Item>
                    <button
                      onClick={toggleEditForm}
                      className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      編集する
                    </button>
                  </Menu.Item>
                  <CopyToClipboard
                    text={`${SITE_URL}/spaces/${space.slug}`}
                    onCopy={() => toast.success('URLをコピーしました')}
                  >
                    <Menu.Item>
                      <button className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'>
                        URLをコピー
                      </button>
                    </Menu.Item>
                  </CopyToClipboard>
                  <Menu.Item>
                    <button
                      onClick={() => onUpdateSpace({ ...space, archived: true })}
                      className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                    >
                      アーカイブ
                    </button>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item>
                    <button
                      onClick={() => onUpdateSpace({ ...space, archived: false })}
                      className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      アーカイブを解除
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={toggleConfirm}
                      className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                    >
                      削除する
                    </button>
                  </Menu.Item>
                </>
              )}
            </Dropdown>
          </div>
        )}
        <Link href={`/spaces/${space.slug}`}>
          <a className='flex-1'>
            <div className='py-4 text-center sm:py-6 bg-primary-100'>
              <Emoji emoji={space.emoji} />
            </div>

            <div className='px-4 pt-2 text-sm font-semibold text-gray-800 break-all sm:text-base line-clamp-2'>
              {space.name}
            </div>
          </a>
        </Link>

        <Link href={`/${space.user.username}`}>
          <a className='flex items-center p-4'>
            <Avatar size='sm' src={space.user.avatar_small_url} alt={space.user.name} />
            <div className='ml-3'>
              <div className='text-xs font-semibold text-gray-700'>{space.user.name}</div>
              <Time
                className='flex-shrink-0 mr-2 text-gray-500'
                size='xs'
                suffix='に作成'
                date={new Date(space.created_at)}
              />
            </div>
          </a>
        </Link>
      </article>
    </>
  );
};
