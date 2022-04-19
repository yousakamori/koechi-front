import { Menu } from '@headlessui/react';
import Link from 'next/link';
import React, { SyntheticEvent } from 'react';
import { BiBell, BiBellOff } from 'react-icons/bi';
import { Avatar } from '@/components/ui/avatar';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Spinner } from '@/components/ui/spinner';
import { Time } from '@/components/ui/time';
import { Typography } from '@/components/ui/typography';
import { useNotifications } from '@/hooks/notifications';
import { CurrentUser } from '@/types/current-user';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export type UserNotificationProps = {
  currentUser: CurrentUser;
};
// ___________________________________________________________________________
//
export const UserNotification: React.VFC<UserNotificationProps> = ({ currentUser }) => {
  const { notification, loading, getNotifications } = useNotifications();

  const handleNotificationClick = async () => {
    if (notification.nextPage === null || notification.nextPage) {
      return;
    }
    await getNotifications(notification.nextPage);
  };

  const handleNotificationScroll = async ({ currentTarget }: SyntheticEvent<HTMLDivElement>) => {
    if (notification.nextPage === null || loading) {
      return;
    }

    if (currentTarget.scrollTop + currentTarget.clientHeight < currentTarget.scrollHeight) {
      return;
    }

    await getNotifications(notification.nextPage);
  };

  const createPermaLink = ({ notifiable_type, notifiable_slug, sender }: Notification) => {
    if (notifiable_type === 'Note') {
      return `/notes/${notifiable_slug}`;
    }

    if (notifiable_type === 'Talk') {
      return `/${currentUser.username}/talks/${notifiable_slug}`;
    }

    if (notifiable_type === 'Comment') {
      return `/link/comments/${notifiable_slug}`;
    }

    if (notifiable_type === 'Membership') {
      return `/spaces/${notifiable_slug}`;
    }

    return `/${sender.username}`;
  };
  // ___________________________________________________________________________
  //
  return (
    <Dropdown
      position='right'
      className='w-64'
      buttonContent={
        <Menu.Button as={React.Fragment}>
          <CircleButton
            className='relative'
            size='md'
            color='secondary'
            aria-label='通知'
            onMouseDown={handleNotificationClick}
          >
            <BiBell />
            {currentUser.notifications_count > 0 && (
              <span className='absolute right-0.5 h-4 p-0.5 text-xs leading-3 text-white rounded-full top-0 min-w-4 bg-primary-500'>
                {currentUser.notifications_count}
              </span>
            )}
          </CircleButton>
        </Menu.Button>
      }
    >
      {notification.items.length ? (
        <div className='overflow-y-auto max-h-80' onScroll={handleNotificationScroll}>
          {notification.items.map((notification) => (
            <Link key={notification.id} href={createPermaLink(notification)}>
              <a className='block px-4 py-3 text-sm text-gray-500 hover:bg-gray-100'>
                <div className='flex items-center max-w-6xl space-x-3'>
                  <Avatar size='sm' src={notification.sender.avatar_small_url} />
                  <Typography color='textSecondary' fontSize='xs' className='w-3/4 break-all'>
                    <span className='text-secondary-800'>{notification.sender.name}</span>
                    さんが
                    <span className='text-secondary-800'>
                      {notification.notifiable_title ? notification.notifiable_title : 'あなた'}
                    </span>
                    {notification.action_text}
                    <Time size='xs' className='block' date={new Date(notification.datetime)} />
                  </Typography>
                </div>
              </a>
            </Link>
          ))}
          {loading && <Spinner color='primary' size='sm' />}
        </div>
      ) : (
        <div className='py-10 text-center'>
          {loading ? (
            <Spinner color='primary' size='sm' />
          ) : (
            <>
              <Typography color='textSecondary' align='center' fontSize='base' className='mb-6'>
                まだ通知はありません
              </Typography>
              <BiBellOff className='mx-auto text-gray-300 text-8xl' />
            </>
          )}
        </div>
      )}
    </Dropdown>
  );
};
