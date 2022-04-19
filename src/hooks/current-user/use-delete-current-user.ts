import { useCallback, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { useCurrentUser } from './use-current-user';
import { DeleteCurrentUserRequest, currentUserApi } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
import { notificationState } from '@/state/notification';
// ___________________________________________________________________________
//
type DeleteUser = (values?: DeleteCurrentUserRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useDeleteCurrentUser = () => {
  const [validating, setValidating] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const resetNotificationState = useResetRecoilState(notificationState);
  // ___________________________________________________________________________
  //
  const deleteCurrentUser = useCallback<DeleteUser>(async (values) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ___________________________________________________________________________
  //
  return { validating, deleteCurrentUser };
};
