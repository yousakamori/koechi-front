import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
// ___________________________________________________________________________
//
const mapColorClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-600',
  error: 'bg-error-400',
};

const mapSizeClasses = {
  xs: ['px-2', 'py-1', 'text-xs'],
  sm: ['px-3', 'py-1', 'text-sm'],
  md: ['px-4', 'py-2', 'text-sm'],
  lg: ['px-5', 'py-3', 'text-base'],
};
// ___________________________________________________________________________
//
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: keyof typeof mapColorClasses;
  size?: keyof typeof mapSizeClasses;
};
// ___________________________________________________________________________
//
export const Badge: React.VFC<BadgeProps> = ({
  children,
  color = 'primary',
  size = 'md',
  className,
  ...rest
}) => {
  const classes = clsx(
    'inline-flex',
    'items-center',
    'justify-center',
    'text-white',
    'rounded-full',
    'whitespace-nowrap',
    mapSizeClasses[size],
    mapColorClasses[color],
    className,
  );
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
