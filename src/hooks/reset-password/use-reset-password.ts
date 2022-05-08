import { useCallback, useState } from 'react';
import { resetPasswordApi } from '@/api/reset-password';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
export const useResetPassword = () => {
  const [validating, setValidating] = useState(false);
  const [validToken, setValidToken] = useState<boolean | undefined>();
  // ___________________________________________________________________________
  //
  const resetPassword = useCallback(async (values: { email: string }) => {
    setValidating(true);
    try {
      await resetPasswordApi.resetPassword(values);
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

  const checkToken = useCallback(async (token: string) => {
    setValidating(true);
    try {
      const { valid_token } = await resetPasswordApi.checkToken(token);
      setValidToken(valid_token);
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

  const updatePassword = useCallback(async (values: { token: string; password: string }) => {
    setValidating(true);
    try {
      await resetPasswordApi.updatePassword(values);
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
  return { validating, validToken, resetPassword, checkToken, updatePassword };
};
