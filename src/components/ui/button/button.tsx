import clsx from 'clsx';
import React from 'react';
import { Spinner } from '@/components/ui/spinner';
// ___________________________________________________________________________
//
const mapVariantClasses = {
  contained: ['shadow', 'text-white', 'hover:shadow-md'],
  outlined: ['shadow', 'border', 'hover:shadow-md'],
  ghost: ['border-none', 'bg-transparent'],
  link: ['hover:underline'],
};

const mapSizeClasses = {
  sm: ['px-3', 'py-1', 'text-sm'],
  md: ['px-4', 'py-2', 'text-sm'],
  lg: ['px-5', 'py-3', 'text-base'],
};

const mapContainedColorClasses = {
  primary: ['bg-primary-600', 'hover:bg-primary-700'],
  secondary: ['bg-secondary-400', 'hover:bg-secondary-500'],
  error: ['bg-error-400', 'hover:bg-error-500'],
};

const mapOutlinedColorClasses = {
  primary: ['bg-white', 'text-primary-500', 'border-primary-500', 'hover:bg-primary-50'],
  secondary: ['bg-white', 'text-secondary-500', 'border-secondary-300', 'hover:bg-secondary-50'],
  error: ['bg-white', 'text-error-500', 'border-error-500', 'hover:bg-error-50'],
};

const mapGhostColorClasses = {
  primary: ['text-primary-500', 'hover:bg-primary-100'],
  secondary: ['text-secondary-500', 'hover:bg-secondary-100'],
  error: ['text-error-500', 'hover:bg-error-100'],
};

const mapLinkColorClasses = {
  primary: ['text-primary-500'],
  secondary: ['text-secondary-500'],
  error: ['text-error-500'],
};
// ___________________________________________________________________________
//
export type BaseButtonProps = {
  variant?: keyof typeof mapVariantClasses;
  size?: keyof typeof mapSizeClasses;
  color?: keyof typeof mapContainedColorClasses;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  roundedFull?: boolean;
  transition?: boolean;
};

export type AnchorButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export type NativeButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

export type ButtonProps = AnchorButtonProps & NativeButtonProps;
// ___________________________________________________________________________
//
export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      roundedFull = false,
      transition = true,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const classes = clsx(
      'inline-flex',
      'items-center',
      'justify-center',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-blue-400',
      fullWidth && 'w-full',
      roundedFull ? 'rounded-full' : 'rounded-lg',
      (disabled || loading) && ['pointer-events-none', 'opacity-40'],
      transition && ['transition-all', 'duration-200', 'ease-in'],
      variant === 'contained' && mapContainedColorClasses[color],
      variant === 'outlined' && mapOutlinedColorClasses[color],
      variant === 'ghost' && mapGhostColorClasses[color],
      variant === 'link' && mapLinkColorClasses[color],
      mapVariantClasses[variant],
      mapSizeClasses[size],
      className,
    );
    // ___________________________________________________________________________
    //
    if (rest.href) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          className={classes}
          {...((disabled || loading) && {
            tabIndex: -1,
            'aria-disabled': true,
          })}
          {...(rest as AnchorButtonProps)}
        >
          {loading && <Spinner className='mr-2' color='secondary' size='sm' />}
          {children}
        </a>
      );
    }
    // ___________________________________________________________________________
    //
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={classes}
        {...((disabled || loading) && { disabled: true, tabIndex: -1 })}
        {...(rest as NativeButtonProps)}
      >
        {loading && <Spinner className='mr-2' color='secondary' size='sm' />}
        {children}
      </button>
    );
  },
);
// ___________________________________________________________________________
//
Button.displayName = 'Button';
