import { useCallback, useState } from 'react';
import { ResetEmailRequest, currentUserApi, UpdateEmailRequest } from '@/api/current-user';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type GetEmail = () => Promise<{ error?: HttpError }>;
type ResetEmail = (values: ResetEmailRequest) => Promise<{ error?: HttpError }>;
type UpdateEmail = (values: UpdateEmailRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useEmail = () => {
  const [validating, setValidating] = useState(false);
  const [email, setEmail] = useState('');
  // ___________________________________________________________________________
  //
  const getEmail = useCallback<GetEmail>(async () => {
    setValidating(true);
    try {
      const { email } = await currentUserApi.getEmail();
      setEmail(email);
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

  const resetEmail = useCallback<ResetEmail>(async (values) => {
    setValidating(true);
    try {
      await currentUserApi.resetEmail(values);
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
  return { email, validating, getEmail, resetEmail, updateEmail };
};
