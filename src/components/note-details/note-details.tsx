import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { BiCalendarAlt, BiPencil, BiRefresh, BiMessageRounded } from 'react-icons/bi';
import useSWR from 'swr';
import { NoteDetailsComments } from './note-details-comments';
import { NoteDetailsNav } from './note-details-nav';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Time } from '@/components/ui/time';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { jsonToHtml } from '@/lib/editor';
import { fetchApi } from '@/lib/fetch-api';
import Error from '@/pages/_error';
import { Comment } from '@/types/comment';
import { NoteDetails as NoteDetailsType } from '@/types/note';
import { Participant } from '@/types/participant';
import { OmitSpace } from '@/types/space';
// ___________________________________________________________________________
//
export const NoteDetails: React.VFC = withLoginRequired(() => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data, error } = useSWR<
    {
      note: NoteDetailsType;
      comments: Comment[];
      space: OmitSpace & { role: Role };
      participants: Participant[];
    },
    HttpError
  >(endpoints.note(slug), fetchApi);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    const hash = router.asPath.split('#')[1] ?? '';

    if (!hash || !data) {
      return;
    }

    const element = document.getElementById(hash);

    if (isFirstLoad.current && element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      isFirstLoad.current = false;
    }
  }, [data, router.asPath]);

  // ___________________________________________________________________________
  //
  if (error) {
    return <Error {...error.serialize()} />;
  }
  // ___________________________________________________________________________
  //
  if (!data) {
    return <></>;
  }
  // ___________________________________________________________________________
  //

  return (
    <>
      <NextSeo title={data.note.title} titleTemplate='%s' />
      <Layout footer={false}>
        {/* nav */}
        <NoteDetailsNav note={data.note} participants={data.participants} />
        <div className='min-h-screen py-10 bg-slate-100'>
          <Container className='max-w-4xl'>
            {/* header */}
            <header className='py-10'>
              <div className='text-center'>
                {(data.note.is_mine || data.space.role === 'admin') && (
                  <div className='text-left'>
                    <Link href={`/notes/${slug}/edit`} passHref>
                      <Button color='secondary' variant='outlined' size='sm'>
                        <BiPencil className='mr-1' />
                        編集
                      </Button>
                    </Link>
                  </div>
                )}
                <div className='mt-6 break-all'>
                  <Typography variant='h1' align='center'>
                    {data.note.title}
                  </Typography>
                </div>
              </div>

              <div className='flex items-center justify-center mt-4 space-x-4'>
                <div className='flex items-center justify-center text-sm text-gray-500'>
                  <BiCalendarAlt className='text-lg' />
                  <Time
                    className='ml-1'
                    date={new Date(data.note.posted_at)}
                    format='yyyy年MM月dd日'
                    suffix='のノート'
                    size='sm'
                  />
                </div>
                {data.note.body_updated_at && (
                  <div className='items-center justify-center hidden text-sm text-gray-500 sm:flex'>
                    <BiRefresh className='text-lg' />
                    <Time
                      className='ml-1'
                      date={new Date(data.note.body_updated_at)}
                      format='yyyy年MM月dd日'
                      suffix='に更新'
                      size='sm'
                    />
                  </div>
                )}
                {data.note.comments_count > 0 && (
                  <div className='flex items-center text-sm text-gray-500'>
                    <BiMessageRounded className='text-lg' />
                    <span className='ml-2 text-sm'> {data.note.comments_count}</span>
                  </div>
                )}
              </div>
            </header>

            {/* body */}
            <div className='px-8 py-10 mt-6 bg-white border border-gray-200 rounded-xl'>
              {data.note.body_json ? (
                <div
                  className='prose break-all prose-sky max-w-none'
                  dangerouslySetInnerHTML={jsonToHtml(data.note.body_json)}
                />
              ) : (
                <div className='text-base text-center text-gray-500'>コンテンツがありません</div>
              )}
            </div>

            {/* comment */}
            <NoteDetailsComments comments={data.comments} noteId={data.note.id} />
          </Container>
        </div>
      </Layout>
    </>
  );
});
