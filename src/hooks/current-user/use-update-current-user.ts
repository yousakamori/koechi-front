import { useCallback, useState } from 'react';
import { useCurrentUser } from './use-current-user';
import { UpdateCurrentUserRequest, currentUserApi } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type UpdateUser = (values: UpdateCurrentUserRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useUpdateCurrentUser = () => {
  const { setCurrentUser } = useCurrentUser();
  const [validating, setValidating] = useState(false);
  // ___________________________________________________________________________
  //
  const updateCurrentUser = useCallback<UpdateUser>(
    async (values) => {
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
  // ___________________________________________________________________________
  //
  return { validating, updateCurrentUser };
};
