import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { DeleteAccount } from '@/components/pages/settings';
// ___________________________________________________________________________
//
const DeleteAccountPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='退会' />
      <DeleteAccount />
    </>
  );
};
// ___________________________________________________________________________
//
export default DeleteAccountPage;
