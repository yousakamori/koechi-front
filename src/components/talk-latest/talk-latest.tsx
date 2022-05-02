import { NextSeo } from 'next-seo';
import React from 'react';
import { Layout } from '@/components/common/layout';
import { TalkItem } from '@/components/models/talk';
import { Container } from '@/components/ui/container';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type TalkLatestProps = {
  talksLatest: { talks: Talk[]; next_page: NextPage };
};
// ___________________________________________________________________________
//
export const TalkLatest: React.VFC<TalkLatestProps> = ({ talksLatest: { talks, next_page } }) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='トーク一覧' />
      <Layout>
        <div className='min-h-screen py-10'>
          <Container className='max-w-5xl'>
            <Typography variant='h1' className='mt-6'>
              トーク一覧
            </Typography>

            <div className='mt-4 bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg'>
              {talks.map((talk) => (
                <TalkItem key={talk.id} talk={talk} className='p-4' />
              ))}
            </div>

            <div className='mt-4'>
              <Pagination nextPage={next_page} />
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
};
