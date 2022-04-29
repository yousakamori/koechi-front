import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { talksApi, TalksResponse } from '@/api/talks';
import { Layout } from '@/components/common/layout';
import { HomeTalksList } from '@/components/home/home-talks-list';
import { Spinner } from '@/components/ui/spinner';
import { HttpError, HttpErrorObject } from '@/error/http-error';
import Error from '@/pages/_error';
// ___________________________________________________________________________
//
const Hero = dynamic<object>(() => import('@/components/home/hero').then((mod) => mod.Hero));

const HomeNotesList = dynamic<object>(() =>
  import('@/components/home/home-notes-list').then((mod) => mod.HomeNotesList),
);
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
  const query = `order=weekly&count=${COUNT}&min_comments_count=${MIN_COMMENTS_COUNT}`;

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
    return <Spinner color='primary' size='lg' />;
  }
  // ___________________________________________________________________________
  //
  return (
    <Layout navbar>
      <Hero />
      <HomeTalksList talks={talksExplore.talks} />
      <HomeNotesList />
    </Layout>
  );
};
// ___________________________________________________________________________
//
export default HomePage;
