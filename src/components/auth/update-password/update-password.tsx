import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdatePasswordRequest } from '@/api/reset-password';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageLoading } from '@/components/ui/page-loading';
import { Typography } from '@/components/ui/typography';
import { updateNewPasswordSchema } from '@/config/yup-schema';
import { useResetPassword } from '@/hooks/reset-password';
// ___________________________________________________________________________
//
export const UpdatePassword: React.VFC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdatePasswordRequest>({
    mode: 'onChange',
    resolver: yupResolver(updateNewPasswordSchema),
  });

  const disabled = !isDirty || !isValid;
  const router = useRouter();
  const { validating, validToken, checkToken, updatePassword } = useResetPassword();

  const handleUpdatePassword = async (values: UpdatePasswordRequest) => {
    const { error } = await updatePassword(values);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('パスワードを更新しました');
      router.replace('/');
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    (async () => {
      const { token } = router.query;
      const { error } = await checkToken({ token: token as string });

      if (error) {
        toast.error(error.message);
      } else {
        setValue('token', token as string);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);
  // ___________________________________________________________________________
  //
  if (validToken === undefined) {
    return <PageLoading />;
  }
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='py-10 border-t border-gray-200 min-h-52'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            新しいパスワードを設定
          </Typography>

          {validToken ? (
            <>
              <div className='mt-4 text-center'>
                <div className='inline-block'>
                  <Typography align='left' color='textSecondary' fontSize='sm'>
                    新しく設定したいパスワードを入力してください。
                  </Typography>
                </div>
              </div>

              <form className='grid mt-8 gap-y-6' onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className='grid gap-y-2'>
                  <Label htmlFor='password'>新しいパスワード</Label>
                  <Input
                    {...register('password')}
                    autoFocus
                    id='password'
                    variant='outlined'
                    autoComplete='new-password'
                    color={errors.password?.message ? 'error' : 'secondary'}
                    type='password'
                    fullWidth
                  />
                  <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </div>

                <div className='grid gap-y-2'>
                  <Label htmlFor='password-confirm'>新しいパスワードの再入力</Label>
                  <Input
                    {...register('password_confirm')}
                    id='password-confirm'
                    color={errors.password_confirm?.message ? 'error' : 'secondary'}
                    type='password'
                    fullWidth
                  />
                  <ErrorMessage>{errors.password_confirm?.message}</ErrorMessage>
                </div>

                <Button
                  fullWidth
                  loading={validating}
                  disabled={disabled}
                  variant='contained'
                  type='submit'
                >
                  変更する
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className='mt-4 text-center'>
                <div className='inline-block'>
                  <Typography align='left' color='textSecondary' fontSize='sm'>
                    無効なURLです。もう一度メールアドレスを入力してください。
                  </Typography>
                </div>
              </div>

              <div className='mt-6 text-center'>
                <Link href='/reset_password' passHref>
                  <Button>メールを再送信</Button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
};
