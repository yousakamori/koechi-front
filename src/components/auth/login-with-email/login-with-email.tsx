import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/auth';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const LoginWithEmail: React.VFC = () => {
  const router = useRouter();
  const { token, password } = router.query as { token?: string; password?: string };
  const { authChecking, currentUser } = useCurrentUser();
  const { login } = useAuth();

  useEffect(() => {
    if (authChecking || !router.isReady) {
      return;
    }

    if (currentUser && !currentUser?.username) {
      router.replace('/onboarding');
      return;
    }

    if (!token || !password) {
      router.replace('/');
      return;
    }

    (async (token, password) => {
      const { error } = await login({ token, password });

      if (error) {
        toast.error(error.message);
        router.push(currentUser ? '/' : '/signup');
      } else {
        router.push('/onboarding');
      }
    })(token, password);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, authChecking]);
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Spinner color='primary' size='lg' />
    </div>
  );
};
