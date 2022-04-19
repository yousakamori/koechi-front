import { Menu } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown } from '@/components/ui/dropdown';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export type UserMenuProps = {
  currentUser: CurrentUser;
  validating: boolean;
  handleLogout: () => void;
};
// ___________________________________________________________________________
//
export const UserMenu: React.VFC<UserMenuProps> = ({ currentUser, validating, handleLogout }) => {
  const links = [
    { title: 'トークの管理', route: `/${currentUser.username}` },
    { title: 'ノートの管理', route: '/me' },
    { title: 'スペースの管理', route: '/me/spaces' },
    { title: 'いいねした投稿', route: '/me/library' },
    { title: 'アカウント設定', route: '/settings/account' },
  ];
  // ___________________________________________________________________________
  //
  return (
    <Dropdown
      position='right'
      className='w-56'
      buttonContent={
        <Menu.Button>
          <Avatar alt='ユーザーメニュー' src={currentUser.avatar_url} size='md' />
        </Menu.Button>
      }
    >
      <>
        <div>
          <Link href={`/${currentUser.username}`}>
            <a className='block px-4 py-2 text-sm hover:bg-gray-100'>
              <p className='font-medium text-gray-800 line-clamp-1'>{currentUser.name}</p>
              <p className='text-gray-500 truncate'>@{currentUser.username}</p>
            </a>
          </Link>
        </div>
        <div>
          {links.map((link) => (
            <Menu.Item key={link.title}>
              <Link href={link.route}>
                <a className='block px-4 py-3 text-sm text-gray-500 hover:bg-gray-100'>
                  {link.title}
                </a>
              </Link>
            </Menu.Item>
          ))}
        </div>
        <div>
          <Menu.Item>
            <button
              disabled={validating}
              onClick={handleLogout}
              className='block w-full px-4 py-3 text-sm text-left text-gray-900 hover:bg-gray-100'
            >
              ログアウト
            </button>
          </Menu.Item>
        </div>
      </>
    </Dropdown>
  );
};
