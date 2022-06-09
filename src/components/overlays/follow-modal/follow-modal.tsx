import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { UserItem } from '@/components/models/user';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type FollowModalProps = {
  username: string;
  open: boolean;
  isFollowing: boolean;
  onClose: () => void;
};
// ___________________________________________________________________________
//
export const FollowModal: React.VFC<FollowModalProps> = ({
  username,
  open,
  isFollowing,
  onClose,
}) => {
  const endpoint = isFollowing ? endpoints.followings(username) : endpoints.followers(username);
  const { data, size, error, setSize } = useSWRInfinite<
    { users: OmitUser; next_page: NextPage },
    HttpError
  >((index) => `${endpoint}?page=${index + 1}`, fetchApi);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const users = data ? data.flatMap((v) => v.users) : [];
  const nextPage: NextPage = data ? data.slice(-1)[0].next_page : null;
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      <Typography fontSize='base' color='textPrimary'>
        {isFollowing ? 'フォロー中' : 'フォロワー'}
      </Typography>

      <div className='mt-6 overflow-y-auto max-h-80'>
        {users.map((user) => (
          <div key={user.id} className='px-4'>
            <UserItem user={user} />
          </div>
        ))}

        {nextPage && (
          <div className='flex justify-center mt-6'>
            <Button
              onClick={() => setSize(size + 1)}
              loading={isLoadingMore}
              variant='outlined'
              color='secondary'
            >
              もっと読み込む
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
