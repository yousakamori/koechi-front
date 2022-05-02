import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { SignUp } from '@/components/auth/signup';
// ___________________________________________________________________________
//
const SignUpPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='会員登録' />
      <SignUp />
    </>
  );
};
// ___________________________________________________________________________
//
export default SignUpPage;
