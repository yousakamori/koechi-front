import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { NewSpace } from '@/components/pages/new-space';
// ___________________________________________________________________________
//
const NewSpacePage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='スペースの作成' />
      <NewSpace />
    </>
  );
};
// ___________________________________________________________________________
//
export default NewSpacePage;
