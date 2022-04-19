import { NextSeo } from 'next-seo';
import { Layout } from '@/components/common/layout';
import { Error } from '@/components/error';
import { HttpErrorObject } from '@/error/http-error';
// ___________________________________________________________________________
//
const AppError = ({ message, http }: HttpErrorObject) => {
  // ___________________________________________________________________________
  //
  return (
    <Layout>
      <NextSeo title={message} />
      {http.status === 401 ? (
        // TODO: 未実装
        <p>Require Login</p>
      ) : (
        <Error statusCode={http.status} title={message} />
      )}
    </Layout>
  );
};
// ___________________________________________________________________________
//
export default AppError;
