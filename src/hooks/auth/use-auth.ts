import { useCallback, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { useCurrentUser } from '../current-user';
import { authApi, SignupRequest, LoginRequest } from '@/api/auth';
import { HttpError } from '@/error/http-error';
import { notificationState } from '@/state/notification';
// ___________________________________________________________________________
//
type Signup = (values: SignupRequest) => Promise<{ error?: HttpError }>;
type Login = (values: LoginRequest) => Promise<{ error?: HttpError }>;
type Logout = () => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useAuth = () => {
  const [validating, setValidating] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const resetNotificationState = useResetRecoilState(notificationState);
  // ___________________________________________________________________________
  //
  const signup = useCallback<Signup>(async (values) => {
    setValidating(true);
    try {
      await authApi.signup(values);
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

  const login = useCallback<Login>(
    async (values) => {
      setValidating(true);
      try {
        const currentUser = await authApi.login(values);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const logout = useCallback<Logout>(async () => {
    setValidating(true);
    try {
      await authApi.logout();
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
  return { validating, signup, login, logout };
};
