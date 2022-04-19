import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { UpdatePassword } from '@/components/pages/auth';
// ___________________________________________________________________________
//
const UpdatePasswordPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='新しいパスワードを設定' />
      <UpdatePassword />
    </>
  );
};
// ___________________________________________________________________________
//
export default UpdatePasswordPage;
