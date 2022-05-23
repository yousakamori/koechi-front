import React from 'react';
import { MeContainer } from '../me-container';
import { NotesList } from './notes-list';
import { Layout } from '@/components/common/layout';
// ___________________________________________________________________________
//
export const Note: React.VFC = () => {
  // ___________________________________________________________________________
  //
  return (
    <Layout customMeta={{ title: 'ノートの管理', titleTemplate: '%s' }}>
      <MeContainer className='max-w-5xl'>
        <NotesList />
      </MeContainer>
    </Layout>
  );
};
