import clsx from 'clsx';
import React from 'react';

export type DividerProps = {
  className?: string;
};

export const Divider: React.VFC<DividerProps> = ({ className }) => {
  return <div className={clsx('block', 'border-t', 'border-secondary-200', 'w-full', className)} />;
};
