import { useCallback, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentUserApi } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
import { currentUserState } from '@/state/current-user';
import { notificationState } from '@/state/notification';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export const useCurrentUser = () => {
  const [validating, setValidating] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const authChecking = currentUser === undefined;
  const setCurrentUser = useSetRecoilState(currentUserState);
  const resetNotificationState = useResetRecoilState(notificationState);
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

  const deleteCurrentUser = useCallback(
    async (values?: { password: string }) => {
      setValidating(true);
      try {
        await currentUserApi.deleteCurrentUser(values);
        setCurrentUser(null);
        resetNotificationState();
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
    [resetNotificationState, setCurrentUser],
  );

  return {
    validating,
    currentUser,
    authChecking,
    setCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
  };
};
