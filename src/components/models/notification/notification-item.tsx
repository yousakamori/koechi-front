import Link from 'next/link';
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Time } from '@/components/ui/time';
import { Typography } from '@/components/ui/typography';
import { CurrentUser } from '@/types/current-user';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export type NotificationItemProps = {
  currentUser: CurrentUser;
  notification: Notification;
};
// ___________________________________________________________________________
//
export const NotificationItem: React.VFC<NotificationItemProps> = ({
  currentUser,
  notification,
}) => {
  const createPermaLink = ({ notifiable_type, notifiable_slug, sender }: Notification) => {
    switch (notifiable_type) {
      case 'Note':
        return `/notes/${notifiable_slug}`;
      case 'Talk':
        return `/${currentUser.username}/talks/${notifiable_slug}`;
      case 'Comment':
        return `/link/comments/${notifiable_slug}`;
      case 'Membership':
        return `/spaces/${notifiable_slug}`;
      default:
        return `/${sender.username}`;
    }
  };
  // ___________________________________________________________________________
  //
  return (
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
  );
};
