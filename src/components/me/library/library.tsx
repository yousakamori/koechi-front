import { NextSeo } from 'next-seo';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { LikesItem } from './likes-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { MyLike } from '@/types/like';
// ___________________________________________________________________________
//
export const Library: React.VFC = React.memo(() => {
  const { data, size, error, setSize } = useSWRInfinite<
    { items: MyLike[]; next_page: NextPage },
    HttpError
  >((index) => `${endpoints.myLibraryLikes}?page=${index + 1}`, fetchApi);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const items = data ? data.flatMap((v) => v.items) : [];
  const nextPage: NextPage = data ? data.slice(-1)[0].next_page : null;
  // ___________________________________________________________________________
  //
  if (!data) {
    return (
      <div className='mt-6'>
        <Spinner color='primary' size='md' />
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  if (items.length) {
    return (
      <>
        <NextSeo title='いいねした投稿' />

        <Typography variant='h1' fontSize='xl' className='py-4'>
          いいねした投稿
        </Typography>

        {items.map((item) => (
          <LikesItem key={item.id} item={item} />
        ))}

        {nextPage && (
          <div className='flex justify-center mt-6'>
            <Button
              onClick={() => setSize(size + 1)}
              loading={isLoadingMore}
              variant='outlined'
              color='secondary'
            >
              もっと読み込む
            </Button>
          </div>
        )}
      </>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='いいねした投稿はありません' />
      <div className='flex justify-center mt-6'>
        <Typography color='textSecondary' fontSize='lg'>
          いいねした投稿はありません
        </Typography>
      </div>

      <div className='w-full'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className='mx-auto' src='/images/empty.svg' width='360' height='259' alt='' />
      </div>
    </>
  );
});
// ___________________________________________________________________________
//
Library.displayName = 'Library';
