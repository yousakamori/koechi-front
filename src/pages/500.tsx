import { NextPage } from 'next';
import Head from 'next/head';

import { Error } from '@/components/error';
// ___________________________________________________________________________
//
const InternalServerErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
      </Head>

      <Error statusCode={500} title='サーバーエラー' />
    </>
  );
};
// ___________________________________________________________________________
//
export default InternalServerErrorPage;
