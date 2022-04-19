import { useCallback, useState } from 'react';
import { UpdateEmailRequest, currentUserApi } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type UpdateEmail = (values: UpdateEmailRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useUpdateEmail = () => {
  const [validating, setValidating] = useState(false);
  // ___________________________________________________________________________
  //
  const updateEmail = useCallback<UpdateEmail>(async (values) => {
    setValidating(true);
    try {
      await currentUserApi.updateEmail(values);
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
  return { validating, updateEmail };
};
