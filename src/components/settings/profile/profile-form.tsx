import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SiTwitter } from 'react-icons/si';
import { toast } from 'react-toastify';
import { AvatarUpload } from '@/components/avatar-upload';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { updateProfileSchema } from '@/config/yup-schema';
import { useCurrentUser } from '@/hooks/current-user';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
type UpdateValues = Pick<CurrentUser, 'name' | 'bio' | 'twitter_username'>;

export type ProfileFormProps = { currentUser: CurrentUser };
// ___________________________________________________________________________
//
export const ProfileForm: React.VFC<ProfileFormProps> = ({ currentUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateValues>({
    mode: 'onChange',
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio,
      twitter_username: currentUser.twitter_username,
    },
  });

  const disabled = !isDirty || !isValid;
  const { validating, updateCurrentUser } = useCurrentUser();

  const handleUpdate = async (values: UpdateValues) => {
    const { error } = await updateCurrentUser(values);

    if (error) {
      toast.error(error.message);
    } else {
      reset(values);
      toast.success('更新しました');
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <div className='block my-12 sm:flex sm:justify-between sm:items-start'>
      <AvatarUpload />
      <div className='w-full sm:w-3/4'>
        <div className='grid mt-6 gap-y-2'>
          <Label htmlFor='name'>表示名</Label>
          <Input
            {...register('name')}
            autoFocus
            id='name'
            autoComplete='nickname'
            color={errors.name?.message ? 'error' : 'secondary'}
            type='text'
            fullWidth
            placeholder='名前(ニックネーム)'
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className='grid mt-6 gap-y-2'>
          <Label htmlFor='bio'>自己紹介</Label>
          <Textarea
            {...register('bio')}
            id='bio'
            color={errors.bio?.message ? 'error' : 'secondary'}
            fullWidth
            placeholder='自己紹介'
            minRows={4}
          />
          <ErrorMessage>{errors.bio?.message}</ErrorMessage>
        </div>

        <div className='grid mt-6 gap-y-2'>
          <Label className='flex items-center' htmlFor='twitter-username'>
            <SiTwitter className='mr-1 text-blue-400' />
            Twitterユーザー名
          </Label>
          <Input
            {...register('twitter_username')}
            id='twitter-username'
            color={errors.twitter_username?.message ? 'error' : 'secondary'}
            type='text'
            fullWidth
            placeholder='@なしで入力'
          />
          <ErrorMessage>{errors.twitter_username?.message}</ErrorMessage>
        </div>
        <Typography className='mt-4' fontSize='xs' color='textSecondary'>
          プロフィールにこれらの情報が公開されます。
        </Typography>
        <div className='mt-8 text-center'>
          <Button
            className='min-w-36'
            loading={validating}
            disabled={disabled}
            size='lg'
            variant='contained'
            onClick={handleSubmit(handleUpdate)}
          >
            更新する
          </Button>
        </div>
      </div>
    </div>
  );
};
