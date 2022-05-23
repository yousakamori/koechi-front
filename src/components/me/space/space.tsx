import React from 'react';
import { MeContainer } from '../me-container';
import { SpaceList } from './space-list';
import { Layout } from '@/components/common/layout';
// ___________________________________________________________________________
//
export const Space: React.VFC = () => {
  return (
    <Layout customMeta={{ title: 'スペースの管理', titleTemplate: '%s' }}>
      <MeContainer className='max-w-5xl'>
        <SpaceList />
      </MeContainer>
    </Layout>
  );
};
