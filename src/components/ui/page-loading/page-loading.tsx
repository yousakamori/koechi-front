import React from 'react';
// ___________________________________________________________________________
//
export const PageLoading: React.VFC = () => {
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-2 h-2 rounded-full bg-primary-500 animate-ping' />
      <div className='w-2 h-2 mx-4 rounded-full bg-primary-500 animate-ping' />
      <div className='w-2 h-2 rounded-full bg-primary-500 animate-ping' />
    </div>
  );
};
