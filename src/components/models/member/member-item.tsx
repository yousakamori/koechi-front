import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import { BiChevronDown, BiUserCheck } from 'react-icons/bi';
import { ConfirmModalProps } from '@/components/overlays/confirm-modal';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useToggle } from '@/hooks/toggle';
import { Member } from '@/types/member';
// ___________________________________________________________________________
//
const ConfirmModal = dynamic<ConfirmModalProps>(() =>
  import('@/components/overlays/confirm-modal').then((mod) => mod.ConfirmModal),
);
// ___________________________________________________________________________
//
export type MemberItemProps = {
  member: Member;
  role: Role;
  onUpdateMember: (v: { username: string; role: Role }) => Promise<void>;
  onDeleteMember: (username: string) => Promise<void>;
};
// ___________________________________________________________________________
//
export const MemberItem: React.VFC<MemberItemProps> = ({
  member,
  role,
  onUpdateMember,
  onDeleteMember,
}) => {
  const [open, toggleModal] = useToggle();
  const handleDeleteMember = async () => {
    await onDeleteMember(member.username);
    toggleModal();
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <ConfirmModal
        title='退出させますか？'
        description={`スペースから「${member.name}」を削除しますか?`}
        confirmText='退出させる'
        open={open}
        onConfirm={handleDeleteMember}
        onClose={toggleModal}
      />

      <div className='flex items-center justify-between py-2 border-b border-gray-200'>
        <div className='flex items-center'>
          <Avatar src={member.avatar_small_url} size='sm' />
          <div className='ml-2'>
            <div className='text-xs font-semibold text-gray-800 line-clamp-1'>{member.name}</div>
            <div className='text-xs text-gray-500'>
              @{member.username}
              {member.is_owner && (
                <span className='ml-1 text-xs font-semibold text-primary-500'>(オーナー)</span>
              )}
            </div>
          </div>
        </div>

        <div className='flex items-center min-w-[80px]'>
          <div className='flex items-center text-xs font-semibold text-gray-500'>
            {member.role === 'admin' ? '管理者' : 'メンバー'}
            {member.is_owner && <BiUserCheck className='ml-3 text-xl text-primary-500' />}
          </div>
          {role === 'admin' && !member.is_owner && (
            <Dropdown
              position='right'
              className='w-56'
              buttonContent={
                <Menu.Button as={React.Fragment}>
                  <CircleButton variant='none' color='secondary' aria-label='メニューを開く'>
                    <BiChevronDown />
                  </CircleButton>
                </Menu.Button>
              }
            >
              <div>
                {member.role === 'member' && (
                  <Menu.Item>
                    <button
                      onClick={() => onUpdateMember({ username: member.username, role: 'admin' })}
                      type='button'
                      className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      <div className='mb-1 text-sm font-semibold text-gray-800'>管理者に変更</div>
                      <div className='text-xs text-gray-500'>
                        ノートの閲覧、編集ユーザーの招待、削除ができます。
                      </div>
                    </button>
                  </Menu.Item>
                )}

                {member.role === 'admin' && (
                  <Menu.Item>
                    <button
                      onClick={() => onUpdateMember({ username: member.username, role: 'member' })}
                      type='button'
                      className='block w-full px-4 py-3 text-sm text-left text-gray-500 hover:bg-gray-100'
                    >
                      <div className='mb-1 text-sm font-semibold text-gray-800'>メンバーに変更</div>
                      <div className='text-xs text-gray-500'>ノートの閲覧、編集ができます。</div>
                    </button>
                  </Menu.Item>
                )}

                {!member.is_owner && (
                  <Menu.Item>
                    <button
                      type='button'
                      onClick={toggleModal}
                      className='block w-full px-4 py-3 text-sm font-semibold text-left text-red-500 hover:bg-red-100'
                    >
                      退出させる
                    </button>
                  </Menu.Item>
                )}
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
};
