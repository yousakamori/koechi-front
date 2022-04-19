import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PageLoading } from '../../ui/page-loading';
import { useCurrentUser } from '@/hooks/current-user';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
type withLoginRequiredType = {
  currentUser: CurrentUser;
};
// ___________________________________________________________________________
//
export const withLoginRequired = <P extends object>(
  Component: React.ComponentType<P & withLoginRequiredType>,
  route = '/',
) => {
  const HOC = (props: P) => {
    const { authChecking, currentUser } = useCurrentUser();

    const router = useRouter();
    const isOnboarding = router.asPath === '/onboarding';

    useEffect(() => {
      if (authChecking) {
        return;
      }

      if (!currentUser) {
        router.replace(route);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authChecking, router]);
    // ___________________________________________________________________________
    //
    if (authChecking || !currentUser || (isOnboarding && currentUser.username)) {
      return <PageLoading />;
    }
    // ___________________________________________________________________________
    //
    return <Component currentUser={currentUser} {...props} />;
  };
  // ___________________________________________________________________________
  //
  return HOC;
};
