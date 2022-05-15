import clsx from 'clsx';
import React from 'react';
import styles from './fade-in-up.module.css';
// ___________________________________________________________________________
//
export type FadeInUpProps = {
  children: React.ReactNode;
  animationDelay?: string;
  animationDuration?: string;
  className?: string;
};
// ___________________________________________________________________________
//
export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  animationDelay = '0.2s',
  animationDuration = '0.4s',
  className,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <div
      style={{ animationDelay, animationDuration }}
      className={clsx(styles.container, className)}
    >
      {children}
    </div>
  );
};
