import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  size?: keyof typeof mapFontSizeClasses;
  fontWeight?: keyof typeof mapFontWeightClasses;
  align?: keyof typeof mapAlignClasses;
  color?: keyof typeof mapColorClasses;
};
// ___________________________________________________________________________
//
const mapFontSizeClasses = {
  lg: 'text-lg',
  sm: 'text-sm',
  xs: 'text-xs',
  base: 'text-base',
};

const mapFontWeightClasses = {
  normal: 'font-normal',
  bold: 'font-bold',
  semibold: 'font-semibold',
};

const mapAlignClasses = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

const mapColorClasses = {
  textPrimary: 'text-secondary-700',
  textSecondary: 'text-secondary-500',
};
// ___________________________________________________________________________
//
export const Label: React.VFC<LabelProps> = ({
  size = 'sm',
  fontWeight = 'semibold',
  align = 'left',
  color = 'textPrimary',
  className,
  children,
  ...rest
}) => {
  const classes = clsx(
    'flex',
    'items-center',
    mapFontWeightClasses[fontWeight],
    mapFontSizeClasses[size],
    mapAlignClasses[align],
    mapColorClasses[color],
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  );
};
