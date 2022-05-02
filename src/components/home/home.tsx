import dynamic from 'next/dynamic';
import React from 'react';
import { Layout } from '../common/layout';
import { HomeTalksList } from './home-talks-list';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
const Hero = dynamic<object>(() => import('@/components/home/hero').then((mod) => mod.Hero));

const HomeNotesList = dynamic<object>(() =>
  import('@/components/home/home-notes-list').then((mod) => mod.HomeNotesList),
);
// ___________________________________________________________________________
//
export type HomeProps = {
  talks: Talk[];
};
// ___________________________________________________________________________
//
export const Home: React.VFC<HomeProps> = ({ talks }) => {
  return (
    <Layout navbar>
      <Hero />
      <HomeTalksList talks={talks} />
      <HomeNotesList />
    </Layout>
  );
};
