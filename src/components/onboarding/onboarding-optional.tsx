import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AvatarUpload } from '@/components/avatar-upload';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { APP_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
export type OnboardingOptionalProps = {
  validating: boolean;
  handleSaveProfile: () => void;
  handlePrevStep: () => void;
};
// ___________________________________________________________________________
//
export const OnboardingOptional: React.VFC<OnboardingOptionalProps> = ({
  validating,
  handleSaveProfile,
  handlePrevStep,
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
          プロフィールの設定
        </Typography>

        <div className='mt-4 text-center'>
          <div className='inline-block'>
            <Typography align='left' color='textSecondary' fontSize='sm'>
              好きなことを入力してください
            </Typography>
          </div>
        </div>

        <div className='max-w-md mx-auto mt-10'>
          <div className='text-center'>
            <AvatarUpload />
          </div>
          <div className='grid mt-6 gap-y-2'>
            <Textarea
              {...register('bio')}
              autoFocus
              color={errors.bio?.message ? 'error' : 'secondary'}
              fullWidth
              placeholder='自己紹介'
              minRows={4}
            />
            <ErrorMessage>{errors.bio?.message}</ErrorMessage>
          </div>
          <div className='flex justify-center mt-6'>
            <Button
              className='min-w-44'
              loading={validating}
              disabled={disabled}
              variant='contained'
              size='lg'
              onClick={handleSaveProfile}
            >
              {APP_NAME}をはじめる
            </Button>
          </div>
          <div className='flex justify-center mt-6'>
            <Button variant='ghost' color='secondary' onClick={handlePrevStep}>
              <BiLeftArrowAlt />
              <span className='ml-1'>前へ戻る</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
