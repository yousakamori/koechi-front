import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { TalkItem } from '@/components/models/talk';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type HomeTalksListProps = {
  talks: Talk[];
};
// ___________________________________________________________________________
//
export const HomeTalksList: React.VFC<HomeTalksListProps> = ({ talks }) => {
  // ___________________________________________________________________________
  //
  return (
    <div className='min-h-screen py-10 bg-white'>
      <Container className='max-w-5xl'>
        <div className='text-center text-7xl'>💬</div>
        <Typography variant='h2' className='mt-6'>
          注目のトーク
        </Typography>

        <div className='block mt-6 md:flex md:items-start md:justify-between md:flex-wrap'>
          {talks.map((talk) => (
            <div key={talk.id} className='block md:w-1/2 md:odd:pr-6 md:even:pl-6'>
              <TalkItem talk={talk} className='py-4' />
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center mt-10'>
          <Link href='/talks/explore' passHref>
            <Button variant='link' color='secondary' size='lg'>
              もっと見る
              <BiRightArrowAlt className='text-lg text-secondary-500' />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
