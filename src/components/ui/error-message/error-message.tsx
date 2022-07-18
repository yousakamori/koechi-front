import clsx from 'clsx';
import React from 'react';

import { Typography, TypographyProps } from '@/components/ui/typography';

export type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
  align?: TypographyProps['align'];
};
export const ErrorMessage: React.VFC<ErrorMessageProps> = ({
  children,
  className,
  align = 'left',
}) => {
  const classes = clsx('break-all', className);
  return (
    <Typography className={classes} color='error' fontWeight='semibold' fontSize='xs' align={align}>
      {children}
    </Typography>
  );
};
