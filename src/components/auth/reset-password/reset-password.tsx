import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { resetPasswordSchema } from '@/config/yup-schema';
import { useResetPassword } from '@/hooks/reset-password';
// ___________________________________________________________________________
//
type CreateValues = { email: string };
// ___________________________________________________________________________
//
export const ResetPassword: React.VFC = () => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    setError,
    handleSubmit,
  } = useForm<CreateValues>({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
  });

  const disabled = !isDirty || !isValid;
  const [step, setStep] = useState<'INPUT_EMAIL' | 'COMPLETE'>('INPUT_EMAIL');
  const { validating, resetPassword } = useResetPassword();

  const handleResetPassword = async (values: CreateValues) => {
    const { error } = await resetPassword(values);
    if (error) {
      setError('email', { message: error.message });
    } else {
      setStep('COMPLETE');
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-10 border-t border-gray-200 '>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center' className='mt-10'>
            パスワード再設定
          </Typography>

          {/* 入力フォーム */}
          {step === 'INPUT_EMAIL' && (
            <>
              <div className='mt-4 text-center'>
                <div className='inline-block'>
                  <Typography align='left' color='textSecondary' fontSize='sm'>
                    登録した覚えのあるメールアドレスを入力してください。
                  </Typography>
                </div>
              </div>

              <form className='grid mt-8 gap-y-6' onSubmit={handleSubmit(handleResetPassword)}>
                <div className='grid gap-y-2'>
                  <Input
                    {...register('email')}
                    autoFocus
                    id='email'
                    autoComplete='email'
                    color={errors.email?.message ? 'error' : 'secondary'}
                    type='email'
                    placeholder='メールアドレス'
                    fullWidth
                  />
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>
                </div>

                <Button
                  fullWidth
                  loading={validating}
                  disabled={disabled}
                  variant='contained'
                  type='submit'
                >
                  送信
                </Button>
              </form>
            </>
          )}

          {/* 完了メッセージ */}
          {step === 'COMPLETE' && (
            <div className='mt-4 text-center'>
              <div className='inline-block'>
                <Typography align='left' color='textSecondary' fontSize='sm'>
                  メールに記載されているURLにアクセスし、 パスワードを再設定してください。
                </Typography>

                <div className='w-full mt-6'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className='mx-auto'
                    src='/images/reset-password.svg'
                    width='340'
                    height='340'
                    alt=''
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};
