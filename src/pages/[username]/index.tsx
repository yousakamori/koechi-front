import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { usersApi } from '@/api/users';
import { UserDetails } from '@/components/user-details';
import { HttpError, HttpErrorObject } from '@/error/http-error';
import Error from '@/pages/_error';
import { User } from '@/types/user';
// ___________________________________________________________________________
//
type ServerProps = {
  user: User | null;
  err: HttpErrorObject | null;
};
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<ServerProps>) => ({
  props: {
    user: null,
    err: null,
    ...injects,
  },
});
// ___________________________________________________________________________
//
export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}: GetServerSidePropsContext) => {
  const { username } = params as { username: string };

  try {
    const { user } = await usersApi.getUser(username);
    return propsFactory({ user });
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
const UserDetailsPage: NextPage<ServerProps> = ({ user, err }) => {
  if (err) {
    return <Error {...err} />;
  }
  // ___________________________________________________________________________
  //
  if (!user) {
    return null;
  }
  // ___________________________________________________________________________
  //
  return <UserDetails user={user} />;
};
// ___________________________________________________________________________
//
export default UserDetailsPage;
