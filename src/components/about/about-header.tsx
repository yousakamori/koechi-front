import React from 'react';
import { Container } from '@/components/ui/container';
// ___________________________________________________________________________
//
export const AboutHeader: React.VFC = () => {
  // ___________________________________________________________________________
  //
  return (
    <section className='pt-10 pb-8 overflow-hidden bg-white'>
      <Container className='max-w-5xl'>
        <div className='lg:flex lg:items-center lg:justify-between'>
          <div className='px-4 text-center lg:text-left lg:shrink-0'>
            <div className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
              <p className='block'>介護の情報を</p>
              <p className='block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600'>
                管理・共有するサービスです
              </p>
            </div>

            <p className='max-w-md mx-auto mt-3 text-sm text-left text-gray-500 sm:text-base md:mt-5'>
              あなたの知見を投稿したり、介護の記録を共有してみませんか
            </p>
          </div>

          <div className='w-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/images/about.svg'
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
