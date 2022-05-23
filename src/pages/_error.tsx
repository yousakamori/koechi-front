import { Layout } from '@/components/common/layout';
import { Error } from '@/components/error';
import { HttpErrorObject } from '@/error/http-error';
// ___________________________________________________________________________
//
const AppError = ({ message, http }: HttpErrorObject) => {
  // ___________________________________________________________________________
  //
  return (
    <Layout customMeta={{ title: message }}>
      <Error statusCode={http.status} title={message} />
    </Layout>
  );
};
// ___________________________________________________________________________
//
export default AppError;
