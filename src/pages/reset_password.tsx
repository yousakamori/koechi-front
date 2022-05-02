import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ResetPassword } from '@/components/auth/reset-password';
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
