import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useCurrentUser } from '@/hooks/current-user';
import { BRAND_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
export const Hero: React.VFC = () => {
  const { authChecking, currentUser } = useCurrentUser();
  // ___________________________________________________________________________
  //
  if (authChecking || currentUser) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <section className='pt-10 pb-8 overflow-hidden bg-white'>
      <Container className='max-w-5xl'>
        <div className='lg:flex lg:items-center lg:justify-between'>
          <div className='px-4 text-center lg:text-left lg:shrink-0'>
            <div className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
              {/* TODO: なんか考える */}

              <p className='block'>介護の情報を</p>
              <p className='block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600'>
                管理・共有するサービスです
              </p>
            </div>
            {/* TODO: なんか考える */}
            <p className='max-w-md mx-auto mt-3 text-sm text-left text-gray-500 sm:text-base md:mt-5'>
              毎日の記録を紙から移行してケアマネジャー等と共有してみませんか
            </p>
            <div className='block mt-10 sm:space-x-6 sm:flex sm:justify-center lg:justify-start'>
              <Link href='/signup' passHref>
                <Button size='lg' color='primary' variant='contained' className='w-full sm:w-auto'>
                  無料ではじめる
                </Button>
              </Link>

              <Link href='/about' passHref>
                <Button
                  size='lg'
                  color='secondary'
                  variant='outlined'
                  className='w-full mt-6 sm:w-auto sm:mt-0'
                >
                  {BRAND_NAME}について
                </Button>
              </Link>
            </div>
          </div>

          <div className='w-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/images/hero.svg'
              className='mx-auto'
              width='420'
              height='420'
              alt='ようこそ'
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
