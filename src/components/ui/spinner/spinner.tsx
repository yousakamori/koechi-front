import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
export type SpinnerProps = {
  size?: keyof typeof mapSizeClasses;
  color?: keyof typeof mapColorClasses;
  className?: string;
};
// ___________________________________________________________________________
//
const mapSizeClasses = {
  sm: 'h-4 w-4 border',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-2',
  xl: 'h-10 w-10 border-4',
};

const mapColorClasses = {
  primary: 'border-primary-500',
  secondary: 'border-secondary-600',
  error: 'border-error-500',
};
// ___________________________________________________________________________
//
export const Spinner: React.VFC<SpinnerProps> = ({ size = 'md', color = 'primary', className }) => {
  const classes = clsx(
    'rounded-full',
    'animate-spin',
    'border-t-transparent',
    mapSizeClasses[size],
    mapColorClasses[color],
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    <div className='flex justify-center'>
      <div className={classes}></div>
    </div>
  );
};
