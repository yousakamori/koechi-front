import clsx from 'clsx';
import React from 'react';
import styles from './input.module.css';
// ___________________________________________________________________________
//
export type BaseInputProps = {
  variant?: keyof typeof mapVariantClasses;
  color?: keyof typeof mapColorClasses;
  size?: keyof typeof mapSizeClasses;
  fullWidth?: boolean;
};

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps> &
  BaseInputProps;
// ___________________________________________________________________________
//
const mapColorClasses = {
  primary: ['border-primary-300', 'focus:border-primary-400'],
  secondary: ['border-secondary-300', 'focus:border-primary-400'],
  error: ['border-error-400', 'focus:border-error-500'],
};

const mapSizeClasses = {
  sm: { outlined: ['py-1', 'pl-1.5'], underlined: 'py-1', none: '' },
  md: { outlined: ['py-2', 'pl-2.5'], underlined: 'py-2', none: '' },
  lg: { outlined: ['py-2', 'pl-3.5'], underlined: 'py-2', none: '' },
};

const mapVariantClasses = {
  outlined: ['border', 'rounded'],
  underlined: ['border-b'],
  none: ['bg-transparent'],
};
// ___________________________________________________________________________
//
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, inputRef) => {
  const {
    variant = 'outlined',
    color = 'primary',
    fullWidth = false,
    size = 'md',
    className,
    ...rest
  } = props;

  const classes = clsx(
    'text-secondary-800',
    'placeholder-secondary-500',
    'placeholder-opacity-50',
    'disabled:opacity-75',
    'disabled:cursor-not-allowed',
    'focus:outline-none',
    fullWidth && 'w-full',
    variant !== 'none' && mapColorClasses[color],
    mapSizeClasses[size][variant],
    mapVariantClasses[variant],
    variant === 'outlined' && color == 'error' && styles['input-outlined-error'],
    variant === 'underlined' && color == 'error' && styles['input-underlined-error'],
    variant === 'outlined' && color !== 'error' && styles['input-outlined'],
    variant === 'underlined' && color !== 'error' && styles['input-underlined'],
    className,
  );
  // ___________________________________________________________________________
  //
  return <input ref={inputRef} className={classes} {...rest} />;
});
// ___________________________________________________________________________
//
Input.displayName = 'Input';
