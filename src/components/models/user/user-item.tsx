import Link from 'next/link';
import React from 'react';
import { FollowButton } from '@/components/follow-button';
import { Avatar } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/current-user';
import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type UserItemProps = {
  user: OmitUser;
};
// ___________________________________________________________________________
//
export const UserItem: React.VFC<UserItemProps> = ({ user }) => {
  const { authChecking, currentUser } = useCurrentUser();
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center justify-between py-4 border-b border-gray-200'>
      <Link href={`/${user.username}`}>
        <a className='flex-1'>
          <div className='flex items-center'>
            <Avatar src={user.avatar_small_url} />
            <div className='ml-2'>
              <div className='text-sm font-semibold text-gray-800'>{user.name}</div>
              <div className='text-xs text-gray-500'>@{user.username}</div>
            </div>
          </div>
        </a>
      </Link>

      {!authChecking && (!currentUser || currentUser.id !== user.id) && (
        <FollowButton userId={user.id} />
      )}
    </div>
  );
};
