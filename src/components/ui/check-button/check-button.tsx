import clsx from 'clsx';
import React from 'react';

import styles from './check-button.module.css';
// ___________________________________________________________________________
//
export type BaseCheckButtonProps = {
  checked: boolean;
};

export type CheckButtonProps = BaseCheckButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseCheckButtonProps>;
// ___________________________________________________________________________
//
export const CheckButton: React.VFC<CheckButtonProps> = ({
  checked,
  children,
  className,
  ...rest
}) => {
  const classes = clsx(
    'inline-flex',
    'items-center',
    'cursor-pointer',
    'top-0.5',
    'focus:outline-none',
    'group',
    styles['check-button'],
    className,
  );

  const checkClasses = clsx(
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'w-5',
    'h-5',
    'min-w-[20px]',
    'mr-1.5',
    'rounded',
    checked ? ['bg-primary-400', 'border border-primary-400'] : ['border border-gray-400'],
  );
  const checkBeforeClasses = clsx(
    'before:top-0.5',
    'before:left-1.5',
    'before:absolute',
    'before:border-r-2',
    'before:border-b-2',
    'before:w-1.5',
    'before:h-3',
    'before:rotate-45',
    'before:border-white',
  );
  // ___________________________________________________________________________
  //
  return (
    <button className={classes} {...rest}>
      <span className={clsx(checkClasses, checkBeforeClasses)}></span>
      {children}
    </button>
  );
};
