import { Menu } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
// ___________________________________________________________________________
//
const links = [
  { title: 'トークを作成', route: '/talks/new' },
  { title: 'スペースを作成', route: '/spaces/new' },
];
// ___________________________________________________________________________
//
export const ButtonAddNew: React.VFC = () => {
  // ___________________________________________________________________________
  //
  return (
    <Dropdown
      position='right'
      className='w-56'
      buttonContent={
        <Menu.Button as={React.Fragment}>
          <Button className='hidden sm:block' variant='contained' color='primary'>
            新規作成
          </Button>
        </Menu.Button>
      }
    >
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
    </Dropdown>
  );
};
