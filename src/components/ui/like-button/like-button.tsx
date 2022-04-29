import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { likesApi } from '@/api/likes';
import { LoginLinkModalProps } from '@/components/overlays/login-link-modal';
import { CircleButton, CircleButtonProps } from '@/components/ui/button';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { useCurrentUser } from '@/hooks/current-user';
import { useToggle } from '@/hooks/toggle';
import { fetchApi } from '@/lib/fetch-api';
import { Likable } from '@/types/like';
// ___________________________________________________________________________
//
const LoginLinkModal = dynamic<LoginLinkModalProps>(() =>
  import('@/components/overlays/login-link-modal').then((mod) => mod.LoginLinkModal),
);
// ___________________________________________________________________________
//
export type LikeButtonProps = {
  likableId: number;
  likableType: Likable;
  likedCount?: number;
  size?: CircleButtonProps['size'];
  className?: string;
};
// ___________________________________________________________________________
//
export const LikeButton: React.VFC<LikeButtonProps> = ({
  likableId,
  likableType,
  likedCount = 0,
  size = 'md',
  className,
}) => {
  const { authChecking, currentUser } = useCurrentUser();
  const [count, setCount] = useState(likedCount);
  const [open, toggleModal] = useToggle();

  const { data, mutate } = useSWR<{ liked: boolean }, HttpError>(
    !authChecking && currentUser
      ? `${endpoints.myLiked}?likable_id=${likableId}&likable_type=${likableType}`
      : null,
    fetchApi,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const handleClickLike = async () => {
    try {
      if (!currentUser) {
        toggleModal();
      }

      if (!data) {
        return;
      }

      const { liked } = await likesApi.createLike({
        liked: !data.liked,
        likable_id: likableId,
        likable_type: likableType,
      });

      mutate({ liked }, false);
      setCount((prev) => (liked ? ++prev : --prev));
    } catch (err) {
      if (err instanceof HttpError) {
        toast.error(err.message);
      } else {
        throw err;
      }
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      {/* login link modal */}
      <LoginLinkModal open={open} onClose={toggleModal} />

      <div className={clsx('flex', 'items-center', className)}>
        <div className='rounded-full bg-secondary-100'>
          <CircleButton
            aria-label='いいね'
            variant='none'
            color={data && data.liked ? 'error' : 'secondary'}
            size={size}
            onClick={handleClickLike}
          >
            {data && data.liked ? <FaHeart /> : <FaRegHeart />}
          </CircleButton>
        </div>
        {count > 0 && <span className='ml-1 text-sm text-gray-600'>{count}</span>}
      </div>
    </>
  );
};
