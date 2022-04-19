import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
const mapSizeClasses = {
  sm: ['p-1', 'w-7', 'h-7'],
  md: ['p-1', 'w-9', 'h-9'],
  lg: ['p-1', 'w-12', 'h-12'],
};

const mapIconSize = {
  sm: ['text-base'],
  md: ['text-xl'],
  lg: ['text-2xl'],
};

const mapColorClasses = {
  primary: ['text-primary-400', 'hover:text-primary-500'],
  secondary: ['text-secondary-500', 'hover:text-secondary-800'],
  error: ['text-error-400', 'hover:text-error-500'],
};
// ___________________________________________________________________________
//
export type BaseCircleButtonProps = {
  variant?: 'ghost' | 'none';
  size?: keyof typeof mapSizeClasses;
  color?: keyof typeof mapColorClasses;
  disabled?: boolean;
  transition?: boolean;
  tooltip?: boolean;
};

export type AnchorCircleButtonProps = BaseCircleButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseCircleButtonProps>;

export type NativeCircleButtonProps = BaseCircleButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseCircleButtonProps>;

export type CircleButtonProps = AnchorCircleButtonProps & NativeCircleButtonProps;
// ___________________________________________________________________________
//
export const CircleButton = React.forwardRef<HTMLElement, CircleButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      color = 'primary',
      disabled,
      transition = true,
      tooltip = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const beforeClasses = clsx(
      'before:opacity-0',
      'before:hover:opacity-100',
      'before:border-b-[7px]',
      'before:border-transparent',
      'before:bottom-auto',
      'before:top-full',
      'before:border-[6px]',
      'before:absolute',
      'before:content-[""]',
      'before:border-b-black',
    );
    const afterClasses = clsx(
      'after:top-full after:mt-3',
      'after:text-xs',
      'after:rounded-md',
      'relative',
      'after:whitespace-nowrap',
      'after:px-2.5',
      'after:py-1',
      'after:bg-black',
      'after:text-white',
      'after:opacity-0',
      'after:hover:opacity-100',
      'after:absolute',
      'after:content-[attr(aria-label)]',
    );

    const classes = clsx(
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-blue-400',
      variant === 'ghost' && color === 'primary' && 'hover:bg-primary-50',
      variant === 'ghost' && color === 'secondary' && 'hover:bg-secondary-50',
      variant === 'ghost' && color === 'error' && 'hover:bg-error-50',
      disabled && ['pointer-events-none', 'opacity-40'],
      transition && ['transition-all', 'duration-200', 'ease-in'],
      mapSizeClasses[size],
      mapColorClasses[color],
      tooltip && beforeClasses,
      tooltip && afterClasses,
      className,
    );

    // ___________________________________________________________________________
    //
    if (rest.href) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          className={classes}
          {...(disabled && { tabIndex: -1, 'aria-disabled': true })}
          {...(rest as AnchorCircleButtonProps)}
        >
          <div className={clsx(mapIconSize[size])}>{children}</div>
        </a>
      );
    }
    // ___________________________________________________________________________
    //
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={classes}
        {...(disabled && { disabled: true, tabIndex: -1 })}
        {...(rest as NativeCircleButtonProps)}
      >
        <div className={clsx(mapIconSize[size])}>{children}</div>
      </button>
    );
  },
);
// ___________________________________________________________________________
//
CircleButton.displayName = 'CircleButton';
