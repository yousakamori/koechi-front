import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { currentUserApi } from '@/api/current-user';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const InitializeApp: React.VFC = () => {
  const router = useRouter();
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await currentUserApi.getCurrentUser();
        setCurrentUser(currentUser);

        if (!currentUser.username) {
          router.replace('/onboarding');
        }
      } catch (error) {
        setCurrentUser(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ___________________________________________________________________________
  //
  return null;
};
