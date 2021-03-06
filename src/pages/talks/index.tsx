import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { talksApi, TalksResponse } from '@/api/talks';
import { TalkLatest } from '@/components/talk-latest';
import { Spinner } from '@/components/ui/spinner';
import { HttpError, HttpErrorObject } from '@/error/http-error';
import Error from '@/pages/_error';
// ___________________________________________________________________________
//
type ServerProps = {
  talksLatest: TalksResponse | null;
  err: HttpErrorObject | null;
};
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<ServerProps>) => ({
  props: {
    talksLatest: null,
    err: null,
    ...injects,
  },
});
// ___________________________________________________________________________
//
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context: GetServerSidePropsContext,
) => {
  const { page = '1', min_comments_count } = context.query as {
    page: string;
    min_comments_count: string;
  };
  const query = `order=latest&min_comments_count=${min_comments_count || 1}&page=${page}`;

  try {
    const data = await talksApi.getTalks(query);
    return propsFactory({ talksLatest: { ...data } });
  } catch (err) {
    if (err instanceof HttpError) {
      return propsFactory({
        err: err.serialize(),
      });
    }
    throw err;
  }
};
// ___________________________________________________________________________
//
const TalksLatestPage: NextPage<ServerProps> = ({ talksLatest, err }) => {
  if (err) {
    return <Error {...err} />;
  }
  // ___________________________________________________________________________
  //
  if (!talksLatest) {
    return <Spinner color='primary' size='lg' />;
  }
  // ___________________________________________________________________________
  //
  return <TalkLatest talksLatest={talksLatest} />;
};
// ___________________________________________________________________________
//
export default TalksLatestPage;
