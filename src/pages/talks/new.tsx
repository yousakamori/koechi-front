import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { NewTalk } from '@/components/pages/talks/new-talk';
// ___________________________________________________________________________
//
const NewTalkPage: NextPage = () => {
  return (
    <>
      <NextSeo title='トークを作成' />
      <NewTalk />
    </>
  );
};
// ___________________________________________________________________________
//
export default NewTalkPage;
