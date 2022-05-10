import React from 'react';
import { BsChatDots } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { SiMyspace } from 'react-icons/si';
import { Typography } from '../ui/typography';
import { AboutCard } from './about-card';
import { AboutHeader } from './about-header';
import { Layout } from '@/components/common/layout';
import { Container } from '@/components/ui/container';
import { APP_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
export const About: React.VFC = () => {
  const cards = [
    {
      icon: BsChatDots,
      title: 'トーク',
      body: 'ユーザー同士で知見や意見交換をしたり、記事を通して誰かとつながる場所です。',
    },
    {
      icon: SiMyspace,
      title: 'スペース',
      body: '招待したユーザー(施設の担当者やケアマネジャーなど)と記録を共有できます。',
    },
    {
      icon: CgNotes,
      title: 'ノート',
      body: '毎日の記録をスペースに招待したユーザーと共有することができます。',
    },
  ];
  // ___________________________________________________________________________
  //
  return (
    <Layout navbar>
      <AboutHeader />
      <div className='min-h-screen py-6'>
        <Container className='max-w-md sm:max-w-5xl'>
          <div className='mt-4 text-center'>
            <div className='inline-block'>
              <Typography variant='h1' align='left' fontSize='4xl'>
                {APP_NAME} とは？
              </Typography>
            </div>
          </div>

          <section className='block px-8 py-2 mt-6 sm:flex sm:items-center sm:justify-between'>
            <div className='shrink-0'>
              <p className='mx-auto mb-2 text-xl font-semibold text-gray-700 max-w-prose'>
                こんな人におすすめです
              </p>

              <ul className='my-1 ml-5 font-semibold text-gray-500 list-disc text-bse'>
                <li className='py-2'>介護のナレッジを共有したい</li>
                <li className='py-2'>紙でのノート管理をやめたい</li>
                <li className='py-2'>ノートを複数人で共有したい</li>
              </ul>
            </div>
            <div className='w-full'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/images/recommend.svg'
                className='mx-auto'
                width='320'
                height='320'
                alt='ようこそ'
              />
            </div>
          </section>

          <section className='block mt-6 mb-12 sm:grid sm:grid-cols-3 sm:gap-6'>
            {cards.map((card, i) => (
              <div key={i} className='mt-16'>
                <AboutCard {...card} />
              </div>
            ))}
          </section>
        </Container>
      </div>
    </Layout>
  );
};
