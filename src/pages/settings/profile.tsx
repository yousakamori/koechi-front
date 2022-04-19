import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Settings } from '@/components/pages/settings';
// ___________________________________________________________________________
//
const ProfilePage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='プロフィール設定' />
      <Settings />
    </>
  );
};
// ___________________________________________________________________________
//
export default ProfilePage;
