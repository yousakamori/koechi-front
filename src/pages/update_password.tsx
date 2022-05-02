import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { UpdatePassword } from '@/components/auth/update-password';
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
