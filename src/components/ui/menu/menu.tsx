import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
export type MenuProps = React.HTMLAttributes<HTMLDivElement>;
// ___________________________________________________________________________
//
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = clsx(
      'overflow-hidden',
      'border',
      'border-gray-100',
      'bg-white',
      'rounded-lg',
      'shadow-md',
      className,
    );
    // ___________________________________________________________________________
    //
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);
// ___________________________________________________________________________
//
Menu.displayName = 'Menu';
