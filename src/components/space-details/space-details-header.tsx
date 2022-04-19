import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import { BiNote, BiChevronDown, BiEdit, BiRefresh } from 'react-icons/bi';
import { EditSpaceModalProps, UpdateSpace } from '@/components/overlays/edit-space-modal';
import { Button, CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Emoji } from '@/components/ui/emoji';
import { Time } from '@/components/ui/time';
import { Typography } from '@/components/ui/typography';
import { useToggle } from '@/hooks/toggle';
import { SpaceDetails } from '@/types/space';
// ___________________________________________________________________________
//
const EditSpaceModal = dynamic<EditSpaceModalProps>(() =>
  import('@/components/overlays/edit-space-modal').then((mod) => mod.EditSpaceModal),
);
// ___________________________________________________________________________
//
export type SpaceDetailsHeaderProps = {
  space: SpaceDetails;
  validating: boolean;
  onUpdateSpace: UpdateSpace;
};
// ___________________________________________________________________________
//
export const SpaceDetailsHeader: React.VFC<SpaceDetailsHeaderProps> = React.memo(
  ({ space, validating, onUpdateSpace }) => {
    const [open, toggleModal] = useToggle();
    // ___________________________________________________________________________
    //
    return (
      <>
        <EditSpaceModal
          space={space}
          open={open}
          onClose={toggleModal}
          validating={validating}
          onUpdate={onUpdateSpace}
        />

        <header className='relative py-10'>
          {space.archived && (
            <div className='px-4 py-3 mb-6 bg-red-100 border border-gray-200 rounded-lg'>
              <div className='flex flex-wrap items-center justify-between'>
                <Typography variant='h3' color='error' fontSize='base'>
                  このスペースはアーカイブされており、作成者以外は閲覧できません
                </Typography>
                <Button
                  onClick={() => onUpdateSpace({ ...space, archived: false })}
                  className='mt-4 sm:mt-0'
                  color='secondary'
                >
                  アーカイブを解除
                </Button>
              </div>
            </div>
          )}

          <div className='text-center'>
            <Emoji emoji={space.emoji} />
          </div>

          <div className='flex items-center justify-center mt-6'>
            <div className='break-all line-clamp-2 md:line-clamp-none'>
              <Typography variant='h1'>{space.name}</Typography>
            </div>
            {space.is_mine && !space.archived && (
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
                  <Menu.Item>
                    <button
                      onClick={toggleModal}
                      className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      スペースを編集
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => onUpdateSpace({ ...space, archived: true })}
                      className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                    >
                      アーカイブ
                    </button>
                  </Menu.Item>
                </div>
              </Dropdown>
            )}
          </div>

          <div className='flex items-center justify-center mt-4 space-x-4'>
            <div className='flex items-center text-xs text-gray-500'>
              <BiEdit className='text-base' />
              <Time
                className='ml-1'
                size='sm'
                format='yyyy年MM月dd日'
                suffix='に作成'
                date={new Date(space.created_at)}
              />
            </div>

            <div className='items-center hidden text-xs text-gray-500 sm:flex'>
              <BiRefresh className='text-base' />
              <Time
                className='ml-1'
                size='sm'
                format='yyyy年MM月dd日'
                suffix='に更新'
                date={new Date(space.updated_at)}
              />
            </div>

            {space.notes_count > 0 && (
              <div className='flex items-center text-sm text-gray-500'>
                <BiNote className='text-base' />
                <span className='ml-2'> {space.notes_count}</span>
              </div>
            )}
          </div>
        </header>
      </>
    );
  },
);
// ___________________________________________________________________________
//
SpaceDetailsHeader.displayName = 'SpaceDetailsHeader';
