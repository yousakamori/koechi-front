import React from 'react';
import { TalkLatestItem } from './talks-latest-item';
import { Layout } from '@/components/common/layout';
import { Container } from '@/components/ui/container';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type TalksLatestListProps = {
  talksLatest: { talks: Talk[]; next_page: NextPage };
};
// ___________________________________________________________________________
//
export const TalksLatestList: React.VFC<TalksLatestListProps> = ({
  talksLatest: { talks, next_page },
}) => {
  // ___________________________________________________________________________
  //
  return (
    <Layout>
      <div className='min-h-screen py-10'>
        <Container className='max-w-5xl'>
          <Typography variant='h1' className='mt-6'>
            トーク一覧
          </Typography>

          <div className='mt-4 bg-white border border-gray-200 rounded-lg'>
            {talks.map((talk) => (
              <TalkLatestItem key={talk.id} talk={talk} />
            ))}
          </div>

          <div className='mt-4'>
            <Pagination nextPage={next_page} />
          </div>
        </Container>
      </div>
    </Layout>
  );
};
