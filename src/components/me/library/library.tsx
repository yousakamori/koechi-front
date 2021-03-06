import React from 'react';
import { MeContainer } from '../me-container';
import { LibraryList } from './library-list';
import { Layout } from '@/components/common/layout';
// ___________________________________________________________________________
//
export const Library: React.VFC = () => {
  return (
    <Layout customMeta={{ title: 'いいねした投稿', titleTemplate: '%s' }}>
      <MeContainer className='max-w-5xl'>
        <LibraryList />
      </MeContainer>
    </Layout>
  );
};
