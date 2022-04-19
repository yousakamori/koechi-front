import clsx from 'clsx';
import React from 'react';
// eslint-disable-next-line import/named
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import styles from './textarea.module.css';
// ___________________________________________________________________________
//
export type TextareaProps = {
  color?: keyof typeof mapColorClasses;
  size?: keyof typeof mapSizeClasses;
  variant?: keyof typeof mapVariantClasses;
  fullWidth?: boolean;
} & TextareaAutosizeProps;
// ___________________________________________________________________________
//
const mapColorClasses = {
  primary: ['border-primary-300', 'focus:border-primary-400'],
  secondary: ['border-secondary-300', 'focus:border-primary-400'],
  error: ['border-error-400', 'focus:border-error-500'],
};

const mapSizeClasses = {
  sm: { outlined: ['py-1', 'px-1.5'], underlined: 'py-1', none: '' },
  md: { outlined: ['py-2', 'px-2.5'], underlined: 'py-2', none: '' },
  lg: { outlined: ['py-2', 'px-3.5'], underlined: 'py-2', none: '' },
};

const mapVariantClasses = {
  outlined: ['border', 'rounded'],
  underlined: ['border-b'],
  none: ['bg-transparent'],
};
// ___________________________________________________________________________
//
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { variant = 'outlined', color = 'primary', fullWidth = false, size = 'md', className, ...rest },
    ref,
  ) => {
    const classes = clsx(
      'text-secondary-800',
      'placeholder-secondary-500',
      'placeholder-opacity-50',
      'disabled:opacity-75',
      'disabled:cursor-not-allowed',
      'focus:outline-none',
      'resize-none',
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
    return <TextareaAutosize ref={ref} className={classes} {...rest} />;
  },
);
// ___________________________________________________________________________
//
Textarea.displayName = 'Textarea';
