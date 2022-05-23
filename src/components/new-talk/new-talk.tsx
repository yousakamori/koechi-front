import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ErrorMessage } from '@/components/ui/error-message';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { createTalkSchema } from '@/config/yup-schema';
import { useTalkDetails } from '@/hooks/talks/';
// ___________________________________________________________________________
//
type CreateValues = { title: string };
// ___________________________________________________________________________
//
export const NewTalk: React.VFC = withLoginRequired(({ currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateValues>({ mode: 'onChange', resolver: yupResolver(createTalkSchema) });
  const disabled = !isDirty || !isValid;
  const router = useRouter();
  const { validating, createTalk } = useTalkDetails();

  const handleCreateTalk = async (values: CreateValues) => {
    const { slug, error } = await createTalk(values);

    if (slug) {
      router.push(`/${currentUser?.username}/talks/${slug}`);
    }

    if (error) {
      toast.error(error.message);
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Layout customMeta={{ title: 'トークを作成' }}>
      <div className='min-h-screen py-10 border-t border-gray-200'>
        <Container className='max-w-md'>
          <Typography variant='h1' align='center'>
            トークを作成
          </Typography>
          <div className='mt-4 text-center'>
            <div className='inline-block'>
              <Typography align='left' color='textSecondary' fontSize='sm'>
                トークはスレッド形式で気軽に知見をまとめたり意見交換したりする場所です。
              </Typography>
            </div>
          </div>
          <div className='w-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='mx-auto' src='/images/talk.svg' width='300' height='300' alt='' />
          </div>
          <form onSubmit={handleSubmit(handleCreateTalk)}>
            <div className='mt-3'>
              <Textarea
                {...register('title')}
                fullWidth
                autoFocus
                minRows={2}
                placeholder='タイトル'
                color='secondary'
                variant='outlined'
              />
              <ErrorMessage className='mt-1'>{errors.title?.message}</ErrorMessage>
            </div>
            <div className='mt-10 text-center'>
              <Button
                className='min-w-36'
                loading={validating}
                disabled={disabled}
                variant='contained'
                type='submit'
                size='lg'
              >
                トークを作成
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  );
});
