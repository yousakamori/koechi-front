import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Me } from '@/components/me';
// ___________________________________________________________________________
//
const SpacesPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='スペースの管理' />
      <Me />
    </>
  );
};
// ___________________________________________________________________________
//
export default SpacesPage;
