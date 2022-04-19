import { NextPage } from 'next';
import Head from 'next/head';
import { Error } from '@/components/error';
// ___________________________________________________________________________
//
const NotFoundPage: NextPage = () => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <Head>
        <title>見つかりませんでした</title>
      </Head>

      <Error
        statusCode={404}
        title='このページはすでに削除されているか、URLが間違っている可能性があります'
      />
    </>
  );
};
// ___________________________________________________________________________
//
export default NotFoundPage;
