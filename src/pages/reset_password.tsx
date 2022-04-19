import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ResetPassword } from '@/components/pages/auth';
// ___________________________________________________________________________
//
const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <NextSeo title='パスワード再設定' />
      <ResetPassword />
    </>
  );
};
// ___________________________________________________________________________
//
export default ResetPasswordPage;
