import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { likesApi } from '@/api/likes';
import { LoginLinkModalProps } from '@/components/overlays/login-link-modal';
import { CircleButton, CircleButtonProps } from '@/components/ui/button';
import { HttpError } from '@/error/http-error';
import { useCurrentUser } from '@/hooks/current-user';
import { useToggle } from '@/hooks/toggle';
import { Likable } from '@/types/like';
// ___________________________________________________________________________
//
const LoginLinkModal = dynamic<LoginLinkModalProps>(() =>
  import('@/components/overlays/login-link-modal').then((mod) => mod.LoginLinkModal),
);
// ___________________________________________________________________________
//
export type LikeButtonProps = {
  liked: boolean;
  likableId: number;
  likableType: Likable;
  likedCount?: number;
  size?: CircleButtonProps['size'];
  className?: string;
};
// ___________________________________________________________________________
//
export const LikeButton: React.VFC<LikeButtonProps> = ({
  liked,
  likableId,
  likableType,
  likedCount = 0,
  size = 'md',
  className,
}) => {
  const { authChecking, currentUser } = useCurrentUser();
  const [item, setItem] = useState({ liked, likedCount });
  const [open, toggleModal] = useToggle();

  const handleClickLike = async () => {
    try {
      if (authChecking) {
        return;
      }

      if (!currentUser) {
        toggleModal();
        return;
      }

      const { liked } = await likesApi.createLike({
        liked: !item.liked,
        likable_id: likableId,
        likable_type: likableType,
      });

      setItem((prev) => ({ liked, likedCount: liked ? ++prev.likedCount : --prev.likedCount }));
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
            color={item.liked ? 'error' : 'secondary'}
            size={size}
            onClick={handleClickLike}
          >
            {item.liked ? <FaHeart /> : <FaRegHeart />}
          </CircleButton>
        </div>
        {item.likedCount > 0 && (
          <span className='ml-1 text-sm text-gray-600'>{item.likedCount}</span>
        )}
      </div>
    </>
  );
};
