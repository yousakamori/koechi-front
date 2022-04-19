import { ErrorProps } from 'next/error';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
// ___________________________________________________________________________
//
export const Error: React.VFC<ErrorProps> = ({ statusCode, title }) => {
  // ___________________________________________________________________________
  //
  return (
    <Container className='max-w-4xl'>
      <div className='pt-20 pb-10'>
        <div className='font-bold tracking-wider text-center text-gray-700 text-8xl '>
          {statusCode}
        </div>
        <Typography
          className='mt-6'
          align='center'
          variant='h1'
          fontSize='lg'
          color='textSecondary'
        >
          {title}
        </Typography>
        <div className='w-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='mx-auto' src='/images/cat.svg' width='340' height='340' alt='' />
        </div>
        <div className='flex justify-center'>
          <Link href='/' passHref>
            <Button size='lg'>トップへ戻る</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};
