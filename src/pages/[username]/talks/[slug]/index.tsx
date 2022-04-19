import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { talksApi } from '@/api/talks';
import { TalkDetails } from '@/components/pages/talks/talk-details';
import { HttpError, HttpErrorObject } from '@/error/http-error';
import Error from '@/pages/_error';
import { Comment } from '@/types/comment';
import { Participant } from '@/types/participant';
import { TalkDetails as TalkDetailsType } from '@/types/talk';
// ___________________________________________________________________________
//
type TalkResponse = {
  talk: TalkDetailsType;
  comments: Comment[];
  participants: Participant[];
};

type ServerProps = {
  talkDetails: TalkResponse | null;
  err: HttpErrorObject | null;
};
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<ServerProps>) => ({
  props: {
    talkDetails: null,
    err: null,
    ...injects,
  },
});
// ___________________________________________________________________________
//
export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slug, username } = params as { slug: string; username: string };

  try {
    const data = await talksApi.getTalk(slug);

    if (username !== data.talk.user.username) {
      return { notFound: true };
    }

    return propsFactory({ talkDetails: { ...data } });
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
const TalkDetailsPage: NextPage<ServerProps> = ({ talkDetails, err }) => {
  if (err) {
    return <Error {...err} />;
  }
  // ___________________________________________________________________________
  //
  if (!talkDetails) {
    return null;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title={talkDetails.talk.title} />
      <TalkDetails {...talkDetails} />
    </>
  );
};
// ___________________________________________________________________________
//
export default TalkDetailsPage;
