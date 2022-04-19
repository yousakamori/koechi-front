import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Settings } from '@/components/pages/settings';
// ___________________________________________________________________________
//
const AccountPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='アカウント設定' />
      <Settings />
    </>
  );
};
// ___________________________________________________________________________
//
export default AccountPage;
