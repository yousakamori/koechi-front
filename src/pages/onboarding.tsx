import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Onboarding } from '@/components/pages/onboarding';
// ___________________________________________________________________________
//
const OnboardingPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='ようこそ!' />
      <Onboarding />
    </>
  );
};
// ___________________________________________________________________________
//
export default OnboardingPage;
