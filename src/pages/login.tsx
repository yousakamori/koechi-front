import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Login } from '@/components/auth/login';
// ___________________________________________________________________________
//
const LoginPage: NextPage = () => {
  return (
    <>
      <NextSeo title='ログイン' />
      <Login />
    </>
  );
};
// ___________________________________________________________________________
//
export default LoginPage;
