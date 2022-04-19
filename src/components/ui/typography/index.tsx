import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
const mapAlignClasses = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

const mapFontSizeClasses = {
  '6xl': 'text-6xl',
  '5xl': 'text-5xl',
  '4xl': 'text-4xl',
  '3xl': 'text-3xl',
  '2xl': 'text-2xl',
  xl: 'text-xl',
  lg: 'text-lg',
  sm: 'text-sm',
  xs: 'text-xs',
  base: 'text-base',
};

const mapColorClasses = {
  textPrimary: 'text-secondary-800',
  textSecondary: 'text-secondary-500',
  primary: 'text-primary-500',
  error: 'text-error-500',
};

const mapFontWeightClasses = {
  normal: 'font-normal',
  bold: 'font-bold',
  semibold: 'font-semibold',
};

const inferFontSizeFromVariant = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'lg',
  h6: 'lg',
  p: 'base',
};
// ___________________________________________________________________________
//
export type TypographyProps = {
  align?: keyof typeof mapAlignClasses;
  color?: keyof typeof mapColorClasses;
  fontWeight?: keyof typeof mapFontWeightClasses;
  fontSize?: keyof typeof mapFontSizeClasses;
  variant?: keyof typeof inferFontSizeFromVariant;
  fontStyle?: 'italic' | 'normal';
  className?: string;
  children: React.ReactNode;
};

const isHeading = (variant: keyof typeof inferFontSizeFromVariant) => /^h/.test(variant);
// ___________________________________________________________________________
//
export const Typography: React.VFC<TypographyProps> = ({
  align = 'left',
  color = 'textPrimary',
  fontStyle = 'normal',
  variant = 'p',
  fontWeight,
  fontSize,
  children,
  className,
  ...rest
}) => {
  const Component = variant;
  const classes = clsx(
    fontStyle === 'italic' && 'italic',
    isHeading(variant) || fontWeight === undefined ? 'font-bold' : mapFontWeightClasses[fontWeight],
    mapFontSizeClasses[
      fontSize ?? (inferFontSizeFromVariant[variant] as keyof typeof mapFontSizeClasses)
    ],
    color && mapColorClasses[color],
    align && mapAlignClasses[align],
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
