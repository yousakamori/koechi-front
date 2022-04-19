import { GetServerSidePropsContext, NextPage } from 'next';
import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { type, slug } = context.params as { type: string; slug: string };

  try {
    const { path } = await fetchApi<{ path: string }>(
      `${endpoints.links}?type=${type}&slug=${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      redirect: {
        permanent: true,
        destination: path,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
// ___________________________________________________________________________
//
const LinkPage: NextPage = () => {
  return null;
};
// ___________________________________________________________________________
//
export default LinkPage;
