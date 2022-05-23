import { Menu } from '@headlessui/react';
import React, { SyntheticEvent } from 'react';
import { BiBell, BiBellOff } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { NotificationItem } from '@/components/models/notification';
import { CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { useNotifications } from '@/hooks/notifications';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export type NotificationListProps = {
  currentUser: CurrentUser;
};
// ___________________________________________________________________________
//
export const NotificationList: React.VFC<NotificationListProps> = ({ currentUser }) => {
  const { notification, error, loading, getNotifications } = useNotifications();

  if (error) {
    toast.error(error.message);
  }

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
              <span className='absolute right-0.5 h-4 p-0.5 text-xs leading-3 text-white rounded-full top-0 min-w-[16px] bg-primary-500'>
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
            <NotificationItem
              key={notification.id}
              currentUser={currentUser}
              notification={notification}
            />
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
