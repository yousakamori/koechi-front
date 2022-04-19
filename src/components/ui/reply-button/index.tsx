import clsx from 'clsx';
import React from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { CircleButton } from '@/components/ui/button';
// ___________________________________________________________________________
//
export type ReplyButtonProps = {
  commentsCount: number;
  onClick: () => void;
  className?: string;
};
// ___________________________________________________________________________
//
export const ReplyButton: React.VFC<ReplyButtonProps> = ({ commentsCount, onClick, className }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className={clsx('flex', 'items-center', className)}>
      <div className='rounded-full bg-secondary-100'>
        <CircleButton
          aria-label='返信'
          variant='none'
          size='sm'
          color='secondary'
          onClick={onClick}
        >
          <BiMessageRounded className='text-lg' />
        </CircleButton>
      </div>
      <span className='ml-1 text-sm text-gray-600'>
        {commentsCount > 0 ? commentsCount : '返信'}
      </span>
    </div>
  );
};
