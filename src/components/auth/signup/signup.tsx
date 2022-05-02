import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignupRequest } from '@/api/auth';
import { validatorApi } from '@/api/validator';
import { Layout } from '@/components/common/layout';
import { withLogoutRequired } from '@/components/hoc/with-logout-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { signupSchema } from '@/config/yup-schema';
import { useAuth } from '@/hooks/auth';
import { APP_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
export const SignUp: React.VFC = withLogoutRequired(() => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    setError,
    handleSubmit,
  } = useForm<SignupRequest>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });

  const disabled = !isDirty || !isValid;
  const [step, setStep] = useState<'INPUT_EMAIL' | 'COMPLETE'>('INPUT_EMAIL');
  const { validating, signup } = useAuth();

  const handleSignup = async (values: SignupRequest) => {
    const { taken } = await validatorApi.emailTaken(values.email);

    if (taken) {
      setError('email', {
        message: `「${values.email}」はすでに登録済です`,
      });
    } else {
      const { error } = await signup(values);
      if (error) {
        toast.error(error.message);
      } else {
        setStep('COMPLETE');
      }
    }
  };

  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            {APP_NAME}に登録する
          </Typography>

          {/* 入力フォーム */}
          {step === 'INPUT_EMAIL' && (
            <>
              <div className='mt-4 text-center'>
                <div className='inline-block'>
                  <Typography align='left' color='textSecondary' fontSize='sm'>
                    入力したメールアドレスに登録用のURLを送信します。
                  </Typography>
                </div>
              </div>

              <div className='w-48 mx-auto mt-6 sm:w-full '>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/images/signup.svg' width='360' height='360' alt='' />
              </div>

              <form className='grid mt-8 gap-y-6' onSubmit={handleSubmit(handleSignup)}>
                <div className='grid gap-y-2'>
                  <Input
                    {...register('email')}
                    autoFocus
                    autoComplete='email'
                    color={errors.email?.message ? 'error' : 'secondary'}
                    type='email'
                    fullWidth
                    placeholder='メールアドレス'
                  />
                  <ErrorMessage className='mt-1'>{errors.email?.message}</ErrorMessage>
                </div>

                <Button
                  fullWidth
                  loading={validating}
                  disabled={disabled}
                  variant='contained'
                  type='submit'
                >
                  無料で登録
                </Button>
              </form>
            </>
          )}

          {/* 完了メッセージ */}
          {step === 'COMPLETE' && (
            <div className='mt-4 text-center'>
              <div className='inline-block'>
                <Typography align='left' color='textSecondary' fontSize='sm'>
                  メールに記載されているURLにアクセスし、登録を完了してください。
                </Typography>
              </div>

              <div className='w-full'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/images/mail-send.svg' width='360' height='360' alt='' />
              </div>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
});
