import { yupResolver } from '@hookform/resolvers/yup';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { spacesApi } from '@/api/spaces';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EmojiPicker } from '@/components/ui/emoji';
import { ErrorMessage } from '@/components/ui/error-message';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { createSpaceSchema } from '@/config/yup-schema';
import { HttpError } from '@/error/http-error';
import { SpaceDetails } from '@/types/space';
// ___________________________________________________________________________
//
type CreateValues = Pick<SpaceDetails, 'name' | 'emoji'>;
// ___________________________________________________________________________
//
export const NewSpace: React.VFC = withLoginRequired(() => {
  const emojis = [
    '😄',
    '😃',
    '😀',
    '😊',
    '😉',
    '😍',
    '😘',
    '😚',
    '🍏',
    '🐼',
    '🦥',
    '🦧',
    '🚗',
    '👍',
    '♨️',
  ];

  const randomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const [validating, setValidating] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateValues>({
    mode: 'onChange',
    resolver: yupResolver(createSpaceSchema),
    defaultValues: { emoji: randomEmoji() },
  });

  const disabled = !isDirty || !isValid;
  const router = useRouter();

  const handleCreateSpace = useCallback(
    async (values: CreateValues) => {
      setValidating(true);
      try {
        const { space } = await spacesApi.createSpace(values);
        router.push(`/spaces/${space.slug}`);
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      } finally {
        setValidating(false);
      }
    },
    [router],
  );
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='スペースの作成' />
      <Layout>
        <div className='min-h-screen py-10 border-t border-gray-200'>
          <Container className='max-w-lg'>
            <div className='mt-8'>
              <Typography variant='h1' align='center'>
                スペースを作成
              </Typography>
              <div className='mt-4 text-center'>
                <div className='inline-block'>
                  <Typography align='left' color='textSecondary' fontSize='sm'>
                    ユーザー同士で記録を共有できる場所です
                  </Typography>
                </div>
              </div>

              <div className='flex justify-center mt-12'>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <EmojiPicker emoji={value} onSelect={onChange} />
                  )}
                  name='emoji'
                  control={control}
                  rules={{ required: true }}
                />
              </div>

              <div className='grid mt-8 gap-y-2'>
                <div className='overflow-hidden bg-white border border-gray-200 rounded-lg shadow'>
                  <Textarea
                    {...register('name')}
                    autoFocus
                    id='name'
                    fullWidth
                    placeholder='スペースの名前を入力'
                    className='px-3 py-2 text-lg font-bold'
                    variant='none'
                    minRows={3}
                    maxRows={5}
                  />
                </div>

                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </div>

              <div className='mt-6 text-center'>
                <Button
                  onClick={handleSubmit(handleCreateSpace)}
                  className='min-w-36'
                  loading={validating}
                  disabled={disabled}
                  variant='contained'
                  type='button'
                  size='lg'
                >
                  スペースを作成
                </Button>
                <div className='mt-4 text-center'>
                  <div className='inline-block text-sm text-gray-400'>
                    絵文字と名前はいつでも変更できます
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
});
