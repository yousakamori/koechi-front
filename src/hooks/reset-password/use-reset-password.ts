import { useCallback, useState } from 'react';
import {
  CheckTokenRequest,
  resetPasswordApi,
  ResetPasswordRequest,
  UpdatePasswordRequest,
} from '@/api/reset-password';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type ResetPassword = (values: ResetPasswordRequest) => Promise<{ error?: HttpError }>;
type CheckToken = (values: CheckTokenRequest) => Promise<{ error?: HttpError }>;
type UpdatePassword = (values: UpdatePasswordRequest) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useResetPassword = () => {
  const [validating, setValidating] = useState(false);
  const [validToken, setValidToken] = useState<boolean | undefined>();
  // ___________________________________________________________________________
  //
  const resetPassword = useCallback<ResetPassword>(async (values) => {
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

  const checkToken = useCallback<CheckToken>(async (values) => {
    setValidating(true);
    try {
      const { valid_token } = await resetPasswordApi.checkToken(values);
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

  const updatePassword = useCallback<UpdatePassword>(async (values) => {
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
