import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '@/components/common/layout';
import { withLogoutRequired } from '@/components/hoc/with-logout-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { loginSchema } from '@/config/yup-schema';
import { useAuth } from '@/hooks/auth';
// ___________________________________________________________________________
//
type CreateValues = { email: string; password: string };
// ___________________________________________________________________________
//
export const Login: React.VFC = withLogoutRequired(() => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const disabled = !isDirty || !isValid;
  const { validating, login } = useAuth();
  const router = useRouter();

  const handleLogin = async (values: CreateValues) => {
    const { error } = await login(values);

    if (error) {
      setError('email', {
        message: error.message,
      });
    } else {
      router.replace((router.query?.redirect_to as string) || '/');
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false} customMeta={{ title: 'ログイン' }}>
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            ログイン
          </Typography>

          <form className='grid mt-8 gap-y-6' onSubmit={handleSubmit(handleLogin)}>
            <div className='grid gap-y-2'>
              <Label htmlFor='email'>メールアドレス</Label>
              <Input
                {...register('email')}
                autoFocus
                autoComplete='email'
                id='email'
                color={errors.email?.message ? 'error' : 'secondary'}
                type='email'
                fullWidth
              />
            </div>

            <div className='grid gap-y-2'>
              <Label htmlFor='password'>パスワード</Label>
              <Input
                {...register('password')}
                color={errors.email?.message ? 'error' : 'secondary'}
                id='password'
                type='password'
                fullWidth
              />
              <div className='mt-3'>
                <ErrorMessage align='center'>{errors.email?.message}</ErrorMessage>
              </div>
            </div>

            <Button
              fullWidth
              loading={validating}
              disabled={disabled}
              variant='contained'
              type='submit'
            >
              ログイン
            </Button>
          </form>

          <div className='mt-6'>
            <Button
              onClick={() => handleLogin({ email: 'guestuser@example.com', password: 'password' })}
              fullWidth
              variant='outlined'
              type='button'
            >
              ゲストログイン
            </Button>
          </div>

          <div className='grid pt-6 mt-6 border-t border-gray-200 gap-y-3'>
            <Link href='/signup' passHref>
              <Button fullWidth variant='outlined' color='secondary'>
                会員登録はこちら
              </Button>
            </Link>

            <div className='flex justify-center'>
              <Link href='/reset_password' passHref>
                <Button variant='link' color='secondary'>
                  パスワードを忘れた方
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
});
