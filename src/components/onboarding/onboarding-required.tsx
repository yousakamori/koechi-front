import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { APP_NAME, SITE_URL } from '@/lib/constants';
// ___________________________________________________________________________
//
export type OnboardingRequiredProps = {
  validating: boolean;
  handleNextStep: () => void;
  handleCancelRegistration: () => void;
};
// ___________________________________________________________________________
//
export const OnboardingRequired: React.VFC<OnboardingRequiredProps> = ({
  validating,
  handleNextStep,
  handleCancelRegistration,
}) => {
  const {
    register,
    formState: { errors, isDirty, isValid },
  } = useFormContext();
  const disabled = !isDirty || !isValid;
  // ___________________________________________________________________________
  //
  return (
    <div className='relative min-h-screen my-14'>
      <Container>
        <Typography variant='h1' align='center'>
          {APP_NAME}へようこそ
        </Typography>

        <div className='mt-4 text-center'>
          <div className='inline-block'>
            <Typography align='left' color='textSecondary' fontSize='sm'>
              まずは名前とパスワードを入力してください
            </Typography>
          </div>
        </div>

        <div className='max-w-md py-3 mx-auto'>
          <div className='grid mt-8 gap-y-2'>
            <Input
              {...register('name')}
              autoFocus
              variant='underlined'
              autoComplete='nickname'
              color='secondary'
              type='text'
              fullWidth
              placeholder='表示名(ニックネーム)'
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>
          <div className='grid mt-8 gap-y-2'>
            <div className='flex items-center'>
              <Label
                htmlFor='username'
                size='base'
                color='textSecondary'
                fontWeight='normal'
                className='py-2 pr-1 border-b border-secondary-300'
              >
                {SITE_URL}/
              </Label>
              <Input
                {...register('username')}
                id='username'
                variant='underlined'
                autoComplete='username'
                color='secondary'
                type='text'
                fullWidth
                placeholder='ユーザー名'
              />
            </div>
            <p className='text-xs text-gray-600'>後から変更できません</p>
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          </div>

          <div className='grid mt-8 gap-y-2'>
            <Input
              {...register('password')}
              variant='underlined'
              autoComplete='new-password'
              color='secondary'
              type='password'
              fullWidth
              placeholder='パスワード'
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div className='flex justify-center mt-8'>
            <Button
              className='min-w-[180px]'
              loading={validating}
              disabled={disabled}
              variant='contained'
              size='lg'
              onClick={handleNextStep}
            >
              <span className='mr-1'>次へ進む</span>
              <BiRightArrowAlt />
            </Button>
          </div>
          <div className='flex justify-center mt-8'>
            <Button onClick={handleCancelRegistration} variant='ghost' color='secondary'>
              登録を中断する
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
