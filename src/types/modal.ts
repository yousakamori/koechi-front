import React from 'react';

export type Modal = {
  open: boolean;
  closable: boolean;
  contentsNode?: React.ReactNode;
};
