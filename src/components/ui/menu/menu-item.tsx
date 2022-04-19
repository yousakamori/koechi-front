import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
const mapColorClasses = {
  primary: ['text-primary-500', 'hover:bg-primary-50', 'focus:bg-primary-50'],
  secondary: ['text-secondary-500', 'hover:bg-secondary-100', 'focus:bg-secondary-100'],
  error: ['text-error-500', 'hover:bg-error-50', 'focus:bg-error-50'],
};
// ___________________________________________________________________________
//
export type BaseMenuItemProps = {
  color?: keyof typeof mapColorClasses;
};

export type AnchorButtonProps = BaseMenuItemProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseMenuItemProps>;

export type NativeButtonProps = BaseMenuItemProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseMenuItemProps>;

export type MenuItemProps = AnchorButtonProps & NativeButtonProps;
// ___________________________________________________________________________
//
export const MenuItem = React.forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ color = 'primary', children, className, ...rest }, ref) => {
    const classes = clsx(
      'flex',
      'p-3',
      'w-full',
      'text-sm',
      'focus:outline-none',
      mapColorClasses[color],
      className,
    );

    if (rest.href) {
      return (
        <a ref={ref} className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  },
);
// ___________________________________________________________________________
//
MenuItem.displayName = 'MenuItem';
