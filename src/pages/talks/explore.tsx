import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { talksApi, TalksResponse } from '@/api/talks';
import { TalkExplore } from '@/components/talks-explore';
import { Spinner } from '@/components/ui/spinner';
import { HttpError, HttpErrorObject } from '@/error/http-error';
import Error from '@/pages/_error';
// ___________________________________________________________________________
//
type ServerProps = {
  talksExplore: TalksResponse | null;
  err: HttpErrorObject | null;
};
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<ServerProps>) => ({
  props: {
    talksExplore: null,
    err: null,
    ...injects,
  },
});
// ___________________________________________________________________________
//
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context: GetServerSidePropsContext,
) => {
  const { order, min_comments_count } = context.query as {
    order: string;
    min_comments_count: string;
  };
  const query = `order=${order || 'weekly'}&min_comments_count=${min_comments_count || '1'}`;

  try {
    const data = await talksApi.getTalks(query);
    return propsFactory({ talksExplore: { ...data } });
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
const TalksExplorePage: NextPage<ServerProps> = ({ talksExplore, err }) => {
  if (err) {
    return <Error {...err} />;
  }
  // ___________________________________________________________________________
  //
  if (!talksExplore) {
    return <Spinner color='primary' size='lg' />;
  }
  // ___________________________________________________________________________
  //
  return <TalkExplore talksExplore={talksExplore} />;
};
// ___________________________________________________________________________
//
export default TalksExplorePage;
