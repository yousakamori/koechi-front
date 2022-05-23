import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiBox } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { SiMyspace } from 'react-icons/si';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Container } from '@/components/ui/container';
// ___________________________________________________________________________
//
const Tabs: React.VFC = () => {
  const router = useRouter();
  const tabs = [
    {
      name: 'ノート',
      route: '/me',
      active: ['/me/[type]/[year]/[month]/[day]', '/me'].includes(router.pathname),
      icon: CgNotes,
    },
    {
      name: 'ライブラリ',
      route: '/me/library',
      active: router.pathname === '/me/library',
      icon: BiBox,
    },
    {
      name: 'スペース',
      route: '/me/spaces',
      active: router.pathname === '/me/spaces',
      icon: SiMyspace,
    },
  ];
  // ___________________________________________________________________________
  //
  return (
    <>
      {tabs.map((tab) => (
        <Link href={tab.route} key={tab.name}>
          <a
            className={clsx(
              `'w-full block text-center py-4 mb-2 px-2 sm:flex sm:items-center' ${
                tab.active ? 'text-primary-600' : 'text-gray-400'
              }`,
            )}
          >
            <tab.icon className='mx-auto mb-2 text-xl sm:mb-0 sm:mr-2' />
            <span className='text-xs sm:text-sm'>{tab.name}</span>
          </a>
        </Link>
      ))}
    </>
  );
};

// ___________________________________________________________________________
//
export type MeContainerType = {
  children: React.ReactNode;
  className?: string;
};
// ___________________________________________________________________________
//
export const MeContainer: React.VFC<MeContainerType> = withLoginRequired(
  ({ children, className }) => {
    // ___________________________________________________________________________
    //
    return (
      <div className='min-h-screen py-6 border-t border-gray-200'>
        <Container className={className}>
          <div className='flex justify-between mb-4 space-x-2 sm:justify-start sm:space-x-10'>
            <Tabs />
          </div>
          {children}
        </Container>
      </div>
    );
  },
);
