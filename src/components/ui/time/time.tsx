import clsx from 'clsx';
import { formatDistanceToNow, format as dateFormat } from 'date-fns';
import { ja } from 'date-fns/locale';
import React from 'react';
// ___________________________________________________________________________
//
const mapSizeClasses = {
  xs: ['text-xs'],
  sm: ['text-sm'],
  md: ['text-base'],
  lg: ['text-lg'],
};
// ___________________________________________________________________________
//
export type TimeProps = {
  date: Date;
  size?: keyof typeof mapSizeClasses;
  className?: string;
  prefix?: string;
  suffix?: string;
  format?: string;
};
// ___________________________________________________________________________
//
export const Time: React.VFC<TimeProps> = ({
  date,
  size = 'md',
  className,
  prefix,
  suffix,
  format,
}) => {
  // ___________________________________________________________________________
  //
  const classes = clsx(mapSizeClasses[size], className);

  return (
    <time className={classes} dateTime={date.toISOString()}>
      {prefix}
      {format
        ? dateFormat(date, format)
        : formatDistanceToNow(date, { addSuffix: true, locale: ja })}
      {suffix}
    </time>
  );
};
