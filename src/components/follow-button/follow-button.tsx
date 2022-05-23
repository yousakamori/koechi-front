import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { LoginLinkModalProps } from '@/components/overlays/login-link-modal';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/current-user';
import { useFollow } from '@/hooks/follow';
import { useToggle } from '@/hooks/toggle';
// ___________________________________________________________________________
//
const LoginLinkModal = dynamic<LoginLinkModalProps>(() =>
  import('@/components/overlays/login-link-modal').then((mod) => mod.LoginLinkModal),
);
// ___________________________________________________________________________
//
export type FollowButtonProps = {
  userId: number;
};
// ___________________________________________________________________________
//
export const FollowButton: React.VFC<FollowButtonProps> = ({ userId }) => {
  const { follow, unfollow, isFollowing, validating } = useFollow();
  const { authChecking, currentUser } = useCurrentUser();
  const [open, toggleModal] = useToggle();

  const handleFollow = useCallback(
    async (userId: number) => {
      if (!currentUser) {
        toggleModal();
        return;
      }

      const { error } = await follow(userId);

      if (error) {
        toast.error(error.message);
      }
    },
    [currentUser, follow, toggleModal],
  );

  const handleUnfollow = useCallback(
    async (userId: number) => {
      if (!currentUser) {
        toggleModal();
        return;
      }

      const { error } = await unfollow(userId);

      if (error) {
        toast.error(error.message);
      }
    },
    [currentUser, toggleModal, unfollow],
  );
  // ___________________________________________________________________________
  //
  if (authChecking) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      {/* login link modal */}
      <LoginLinkModal open={open} onClose={toggleModal} />

      {/* button */}
      {isFollowing(userId) ? (
        <Button
          onClick={() => handleUnfollow(userId)}
          className='min-w-[96px]'
          loading={validating}
          variant='contained'
          roundedFull
          size='sm'
        >
          フォロー中
        </Button>
      ) : (
        <Button
          onClick={() => handleFollow(userId)}
          className='min-w-[96px]'
          loading={validating}
          variant='outlined'
          roundedFull
          size='sm'
        >
          フォロー
        </Button>
      )}
    </>
  );
};
