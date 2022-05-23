import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { UserCommentList } from './user-comment-list';
import { UserTalksList } from './user-talks-list';
import { Layout } from '@/components/common/layout';
import { FollowButton } from '@/components/follow-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Tabs } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { useCurrentUser } from '@/hooks/current-user';
import { User } from '@/types/user';
// ___________________________________________________________________________
//
export type UserDetailsProps = {
  user: User;
};
// ___________________________________________________________________________
//
export const UserDetails: React.VFC<UserDetailsProps> = ({ user }) => {
  const router = useRouter();
  const { authChecking, currentUser } = useCurrentUser();
  const { username, tab, status } = router.query as {
    username: string;
    status?: string;
    tab?: string;
  };

  const tabs = [
    {
      name: (
        <>
          トーク<span className='ml-1'>{user.talks_count}</span>
        </>
      ),
      route: `/${user.username}`,
      active: !tab || tab !== 'comment',
    },
    {
      name: 'コメント',
      route: `/${user.username}?tab=comment`,
      active: tab === 'comment',
    },
  ];

  let talkTabs = [
    {
      name: 'すべて',
      route: `/${username}`,
      active:
        !status ||
        !['open', 'closed', 'archived'].includes(status) ||
        (!user.is_mine && status === 'archived'),
    },
    {
      name: 'オープン',
      route: `/${username}?status=open`,
      active: status === 'open',
    },
    {
      name: 'クローズ',
      route: `/${username}?status=closed`,
      active: status === 'closed',
    },
  ];

  talkTabs = user.is_mine
    ? [
        ...talkTabs,
        {
          name: 'アーカイブ',
          route: `/${username}?status=archived`,
          active: status === 'archived',
        },
      ]
    : talkTabs;
  // ___________________________________________________________________________
  //
  return (
    <Layout customMeta={{ title: `${user.name}さんの${!tab ? 'トーク' : 'コメント'}` }}>
      <div className='pt-10 border-t border-gray-200'>
        <Container className='max-w-4xl'>
          <div className='block sm:flex sm:items-center sm:justify-between'>
            <div>
              <Avatar size='xl' src={user.avatar_url} />
            </div>
            <div className='flex-1 sm:pl-10'>
              <div className='flex items-center justify-center'>
                <Typography fontSize='2xl' fontWeight='semibold' className='flex-1' variant='h1'>
                  {user.name}
                </Typography>

                {user.is_mine ? (
                  <Link href='/settings/profile' passHref>
                    <Button size='sm' variant='outlined' color='secondary'>
                      プロフィール編集
                    </Button>
                  </Link>
                ) : (
                  <FollowButton userId={user.id} />
                )}
              </div>
              <div className='mt-3'>
                <div
                  className='prose prose-sky max-w-none'
                  dangerouslySetInnerHTML={{
                    __html: user.autolinked_bio,
                  }}
                />
                <div className='flex mt-2 space-x-3'>
                  <Button size='sm' color='secondary' variant='ghost' className='-ml-2'>
                    <span className='pr-1 text-base font-semibold text-gray-700'>
                      {user.following_count}
                    </span>
                    フォロー中
                  </Button>
                  <Button size='sm' color='secondary' variant='ghost' className='-ml-2'>
                    <span className='pr-1 text-base font-semibold text-gray-700'>
                      {user.follower_count}
                    </span>
                    フォロワー
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Tabs tabs={tabs} />
        </Container>
      </div>
      <div className='min-h-screen py-6 bg-slate-100'>
        <Container className='max-w-4xl'>
          {(tab === undefined || tab !== 'comment') && (
            <>
              <Tabs tabs={talkTabs} />
              {!authChecking && currentUser && currentUser.username === user.username && (
                <div className='flex justify-end mt-6 sm:hidden sm:mt-0'>
                  <Link href='/talks/new' passHref>
                    <Button size='sm' variant='outlined' color='secondary'>
                      新規作成
                    </Button>
                  </Link>
                </div>
              )}
              <UserTalksList username={user.username} isMine={user.is_mine} status={status || ''} />
            </>
          )}
          {tab === 'comment' && <UserCommentList username={username} user={user} />}
        </Container>
      </div>
    </Layout>
  );
};
