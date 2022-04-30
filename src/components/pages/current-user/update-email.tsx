import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { currentUserApi } from '@/api/current-user';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { updateEmailSchema } from '@/config/yup-schema';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
type UpdateValues = { token: string; password: string };
// ___________________________________________________________________________
//
export const UpdateEmail: React.VFC = withLoginRequired(() => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
  } = useForm<UpdateValues>({
    mode: 'onChange',
    resolver: yupResolver(updateEmailSchema),
  });
  const disabled = !isDirty || !isValid;

  const router = useRouter();
  const { token } = router.query as { token: string };
  const [validating, setValidating] = useState(false);

  const handleUpdateEmail = async (values: UpdateValues) => {
    setValidating(true);
    try {
      await currentUserApi.updateEmail(values);
      toast.success('メールアドレスを変更しました');
      router.replace('/');
    } catch (err) {
      if (err instanceof HttpError) {
        toast.error(err.message);
      }
      throw err;
    } finally {
      setValidating(false);
    }
  };

  useEffect(() => {
    setValue('token', token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            メールアドレスの再設定
          </Typography>

          {token ? (
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
