import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserApi } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
import { currentUserState } from '@/state/current-user';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export const useCurrentUser = () => {
  const [validating, setValidating] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const authChecking = currentUser === undefined;
  const setCurrentUser = useSetRecoilState(currentUserState);
  // ___________________________________________________________________________
  //
  const updateCurrentUser = useCallback(
    async (values: Partial<CurrentUser>) => {
      setValidating(true);
      try {
        const currentUser = await currentUserApi.updateCurrentUser(values);
        setCurrentUser(currentUser);
        return {};
      } catch (err) {
        if (err instanceof HttpError) {
          return { error: err };
        }
        throw err;
      } finally {
        setValidating(false);
      }
    },
    [setCurrentUser],
  );

  return {
    validating,
    currentUser,
    authChecking,
    setCurrentUser,
    updateCurrentUser,
  };
};
