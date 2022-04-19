import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { UpdateEmail } from '@/components/pages/current-user';
// ___________________________________________________________________________
//
const UpdateEmailPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='メールアドレスの再設定' />
      <UpdateEmail />
    </>
  );
};
// ___________________________________________________________________________
//
export default UpdateEmailPage;
