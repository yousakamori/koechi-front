import { GetServerSideProps, NextPage } from 'next';
import { talksApi, TalksResponse } from '@/api/talks';
import { Home } from '@/components/home';
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
export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
  const COUNT = 30;
  const MIN_COMMENTS_COUNT = 1;
  const query = `order=alltime&count=${COUNT}&min_comments_count=${MIN_COMMENTS_COUNT}`;

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
const HomePage: NextPage<ServerProps> = ({ talksExplore, err }) => {
  if (err) {
    return <Error {...err} />;
  }
  // ___________________________________________________________________________
  //
  if (!talksExplore) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return <Home talks={talksExplore.talks} />;
};
// ___________________________________________________________________________
//
export default HomePage;
