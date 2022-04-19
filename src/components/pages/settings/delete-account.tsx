import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeleteCurrentUserRequest } from '@/api/current-user';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { deleteAccountSchema } from '@/config/yup-schema';
import { useDeleteCurrentUser } from '@/hooks/current-user';
import { BRAND_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
export const DeleteAccount: React.VFC = withLoginRequired(() => {
  const { validating, deleteCurrentUser } = useDeleteCurrentUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<DeleteCurrentUserRequest>({
    mode: 'onChange',
    resolver: yupResolver(deleteAccountSchema),
  });

  const disabled = !isDirty || !isValid;

  const handleLeave = async (values: DeleteCurrentUserRequest) => {
    if (!confirm('本当に退会しますか?')) {
      return;
    }

    const { error } = await deleteCurrentUser(values);

    if (error) {
      setError('password', { message: error.message });
    } else {
      toast.success('退会が完了しました');
      router.replace('/');
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Layout footer={false}>
      <div className='min-h-screen py-10'>
        <Container className='max-w-lg'>
          <Typography variant='h1' align='center'>
            {BRAND_NAME}を退会
          </Typography>

          <div className='mt-4 text-center'>
            <div className='inline-block'>
              <Typography align='left' color='textSecondary' fontSize='sm'>
                アカウントを削除すると、
                <span className='text-red-500'>復元できません。</span>
                <br />
                以下のデータは完全に削除されます
              </Typography>
            </div>
          </div>

          <div className='px-8 py-2 mt-8 rounded-lg bg-slate-100'>
            <ul className='my-1 ml-5 text-gray-600 list-disc'>
              <li className='py-1'>ユーザーの情報</li>
              <li className='py-1'>トーク、ノート、コメント、いいね などの投稿</li>
            </ul>
          </div>

          <div className='grid mt-14 gap-y-2'>
            <Label htmlFor='password'>パスワードを入力してアカウントを削除</Label>
            <Input
              {...register('password')}
              id='password'
              variant='outlined'
              autoComplete='new-password'
              color='secondary'
              type='password'
              fullWidth
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>

          <div className='px-2 mx-auto mt-4'>
            <div className='flex justify-center'>
              <Button
                className='min-w-28'
                loading={validating}
                disabled={disabled}
                color='error'
                size='lg'
                onClick={handleSubmit(handleLeave)}
              >
                退会する
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
});
