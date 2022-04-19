import clsx from 'clsx';
import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { CircleButton, CircleButtonProps } from '@/components/ui/button';
// ___________________________________________________________________________
//
export type LikeButtonProps = {
  liked: boolean;
  likedCount?: number;
  size?: CircleButtonProps['size'];
  className?: string;
  onClick: () => void;
};
// ___________________________________________________________________________
//
export const LikeButton: React.VFC<LikeButtonProps> = ({
  liked,
  likedCount = 0,
  size = 'md',
  className,
  onClick,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <div className={clsx('flex', 'items-center', className)}>
      <div className='rounded-full bg-secondary-100'>
        <CircleButton
          aria-label='いいね'
          variant='none'
          color={liked ? 'error' : 'secondary'}
          size={size}
          onClick={onClick}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </CircleButton>
      </div>
      {likedCount > 0 && <span className='ml-1 text-sm text-gray-600'>{likedCount}</span>}
    </div>
  );
};
