import { yupResolver } from '@hookform/resolvers/yup';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { OnboardingOptionalProps } from './onboarding-optional';
import { OnboardingRequired } from './onboarding-required';
import { validatorApi } from '@/api/validator/validator-api';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { onboardingSchema } from '@/config/yup-schema';
import { useCurrentUser } from '@/hooks/current-user';
import { APP_NAME } from '@/lib/constants';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
const OnboardingOptional = dynamic<OnboardingOptionalProps>(() =>
  import('./onboarding-optional').then((mod) => mod.OnboardingOptional),
);
// ___________________________________________________________________________
//
type UpdateValues = Pick<CurrentUser, 'name' | 'username' | 'bio'> & { password?: string };
// ___________________________________________________________________________
//
export const Onboarding: React.VFC = withLoginRequired(() => {
  const [step, setStep] = useState<'REQUIRED' | 'OPTIONAL' | 'COMPLETE'>('REQUIRED');
  const [validating, setValidating] = useState(false);
  const { validating: validatingUpdate, updateCurrentUser, deleteCurrentUser } = useCurrentUser();
  const router = useRouter();

  const form = useForm<UpdateValues>({
    mode: 'onChange',
    context: { step },
    resolver: yupResolver(onboardingSchema),
  });

  const handlePrevStep = () => {
    setStep('REQUIRED');
  };

  const handleNextStep = async ({ username }: UpdateValues) => {
    setValidating(true);

    const { taken } = await validatorApi.usernameTaken(username + '');
    if (taken) {
      form.setError('username', {
        message: `ユーザー名「${username}」はすでに使用されています`,
      });
    } else {
      setStep('OPTIONAL');
      form.trigger('bio');
    }

    setValidating(false);
  };

  const handleCancelRegistration = async () => {
    if (!confirm('アカウントの作成を中断しますか?')) {
      return;
    }
    const { error } = await deleteCurrentUser();

    if (error) {
      toast.error(error.message);
    } else {
      router.replace('/');
    }
  };

  const handleSaveProfile = async (values: UpdateValues) => {
    const { error } = await updateCurrentUser(values);

    if (error) {
      toast.error(error.message);
    } else {
      setStep('COMPLETE');
      toast.success('登録完了しました');
      router.replace('/');
    }
  };
  // ___________________________________________________________________________
  //
  if (step === 'COMPLETE') {
    return null;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title={`${APP_NAME}へようこそ!`} />

      <FormProvider {...form}>
        {step === 'REQUIRED' && (
          <OnboardingRequired
            validating={validating}
            handleNextStep={form.handleSubmit(handleNextStep)}
            handleCancelRegistration={handleCancelRegistration}
          />
        )}
        {step === 'OPTIONAL' && (
          <OnboardingOptional
            validating={validatingUpdate}
            handleSaveProfile={form.handleSubmit(handleSaveProfile)}
            handlePrevStep={handlePrevStep}
          />
        )}
      </FormProvider>
    </>
  );
});
