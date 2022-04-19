import { useCallback, useState } from 'react';
import { currentUserApi, UpdatePasswordRequest } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type UpdatePassword = (values: UpdatePasswordRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const usePassword = () => {
  const [validating, setValidating] = useState(false);
  // ___________________________________________________________________________
  //
  const updatePassword = useCallback<UpdatePassword>(async (values) => {
    setValidating(true);
    try {
      await currentUserApi.updatePassword(values);
      return {};
    } catch (err) {
      if (err instanceof HttpError) {
        return { error: err };
      }
      throw err;
    } finally {
      setValidating(false);
    }
  }, []);
  // ___________________________________________________________________________
  //
  return { validating, updatePassword };
};
