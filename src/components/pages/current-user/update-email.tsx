import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateEmailRequest } from '@/api/current-user';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { updateEmailSchema } from '@/config/yup-schema';
import { useEmail } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const UpdateEmail: React.VFC = withLoginRequired(() => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    setError,
    getValues,
    handleSubmit,
  } = useForm<UpdateEmailRequest>({
    mode: 'onChange',
    resolver: yupResolver(updateEmailSchema),
  });
  const disabled = !isDirty || !isValid;
  const { validating, updateEmail } = useEmail();
  const router = useRouter();

  const handleUpdateEmail = async (values: UpdateEmailRequest) => {
    const { error } = await updateEmail(values);

    if (error) {
      setError('password', { message: error.message });
    } else {
      toast.success('メールアドレスを変更しました');
      router.replace('/');
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const token = router.query.token as string;
    if (token) {
      setValue('token', token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            メールアドレスの再設定
          </Typography>

          {getValues('token') ? (
            <>
              <div className='mt-4 text-sm text-gray-500'>
                パスワードを入力して、メールアドレス変更を完了してください。
              </div>

              <div className='grid mt-6 gap-y-2'>
                <Input
                  {...register('password')}
                  color='secondary'
                  type='password'
                  placeholder='パスワード'
                  fullWidth
                />

                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </div>
              <div className='mt-6'>
                <Button
                  fullWidth
                  onClick={handleSubmit(handleUpdateEmail)}
                  loading={validating}
                  disabled={disabled}
                  variant='contained'
                >
                  送信
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className='mt-4 text-sm text-gray-500'>
                無効なURLです。もう一度メールアドレスを入力してください。
              </div>

              <div className='mt-6'>
                <Link href='/settings/account' passHref>
                  <Button fullWidth variant='contained'>
                    アカウント設定へ
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
});
