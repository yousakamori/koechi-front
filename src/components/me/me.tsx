import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiHeart } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { SiMyspace } from 'react-icons/si';
import { Library } from './library';
import { Calendar } from './notes/calendar';
import { NotesList } from './notes/notes-list';
import { Spaces } from './spaces';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Tabs } from '@/components/ui/tabs';
// ___________________________________________________________________________
//
const MeTabs: React.VFC = () => {
  const router = useRouter();
  const tabs = [
    {
      name: 'ノート',
      route: '/me',
      active: ['/me/[type]/[year]/[month]/[day]', '/me'].includes(router.pathname),
      icon: CgNotes,
    },
    {
      name: 'いいねした投稿',
      route: '/me/library',
      active: router.pathname === '/me/library',
      icon: BiHeart,
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
export const Me: React.VFC = withLoginRequired(() => {
  const router = useRouter();
  const { status, type, year, month, day } = router.query as {
    status?: string;
    type?: string;
    year?: string;
    month?: string;
    day?: string;
  };

  const date = new Date(`${year}/${month}/${day}`);

  const spaceTabs = [
    {
      name: 'アクティブ',
      route: '/me/spaces?status=active',
      active: router.pathname === '/me/spaces' && (!status || status === 'active'),
    },
    {
      name: 'アーカイブ',
      route: '/me/spaces?status=archived',
      active: router.pathname === '/me/spaces' && status === 'archived',
    },
  ];
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-6 border-t border-gray-200'>
        <Container className='max-w-7xl'>
          <div className='flex justify-between mb-4 space-x-2 sm:justify-start sm:space-x-10'>
            <MeTabs />
          </div>

          {router.pathname === '/me' && <NotesList />}

          {router.pathname === '/me/[type]/[year]/[month]/[day]' && (
            <Calendar type={type} date={date} />
          )}

          {router.pathname === '/me/library' && <Library />}

          {router.pathname === '/me/spaces' && (
            <>
              <Tabs tabs={spaceTabs} />
              <div className='flex justify-end mt-6 sm:hidden sm:mt-0'>
                <Link href='/spaces/new' passHref>
                  <Button size='sm' variant='outlined' color='secondary'>
                    新規作成
                  </Button>
                </Link>
              </div>
              <Spaces status={status} />
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
});
