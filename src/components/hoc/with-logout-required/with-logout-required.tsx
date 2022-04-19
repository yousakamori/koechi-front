import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PageLoading } from '../../ui/page-loading';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const withLogoutRequired = <P extends object>(
  Component: React.ComponentType<P>,
  route = '/',
) => {
  const HOC = (props: P) => {
    const { authChecking, currentUser } = useCurrentUser();

    const router = useRouter();

    useEffect(() => {
      if (authChecking || !currentUser?.username) {
        return;
      }

      if (currentUser) {
        router.replace(route);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authChecking, router]);
    // ___________________________________________________________________________
    //
    if (authChecking || currentUser) {
      return <PageLoading />;
    }
    // ___________________________________________________________________________
    //
    return <Component {...props} />;
  };
  // ___________________________________________________________________________
  //
  return HOC;
};
