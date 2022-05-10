import React from 'react';
import { IconType } from 'react-icons';
import { Typography } from '../ui/typography';
// ___________________________________________________________________________
//
export type AboutCardProps = {
  icon: IconType;
  title: string;
  body: string;
};
// ___________________________________________________________________________
//
export const AboutCard: React.VFC<AboutCardProps> = ({ icon: Icon, title, body }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='flow-root px-6 pb-8 rounded-lg bg-slate-50'>
      <div className='-mt-6'>
        <div className='flex justify-center'>
          <span className='inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-gradient-to-r from-sky-500 to-blue-600'>
            <Icon className='text-2xl text-white' />
          </span>
        </div>
        <Typography variant='h2' align='left' color='textSecondary' fontSize='xl' className='mb-2'>
          {title}
        </Typography>
        <p className='mt-5 text-base text-gray-700'>{body}</p>
      </div>
    </div>
  );
};
