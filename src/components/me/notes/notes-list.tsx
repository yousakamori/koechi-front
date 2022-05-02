import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { NoteHeader } from './note-header';
import { notesApi } from '@/api/notes';
import { NoteItem } from '@/components/models/note/';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export const NotesList: React.VFC = React.memo(() => {
  const router = useRouter();
  const { page = '1' } = router.query as { page: string };
  const currentPage = Number(page);
  const { data, mutate } = useSWR<{ notes: Note[]; next_page: NextPage }, HttpError>(
    `${endpoints.myNotes}?page=${currentPage}`,
    fetchApi,
  );

  const handleDeleteNote = useCallback(
    async (slug: string) => {
      try {
        await notesApi.deleteNote(slug);
        mutate();
        toast.success('削除しました');
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      }
    },
    [mutate],
  );

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
  if (data.notes.length) {
    return (
      <>
        <NextSeo title='ノートの管理' titleTemplate='%s' />
        <NoteHeader type='list' displayDate={new Date()} />

        <div className='divide-y divide-gray-200'>
          {data.notes.map((note) => (
            <NoteItem key={note.id} note={note} onDeleteNote={handleDeleteNote} />
          ))}
        </div>
        <div className='mt-6'>
          <Pagination nextPage={data.next_page} />
        </div>
      </>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='ノートはありません' titleTemplate='%s' />
      <NoteHeader type='list' displayDate={new Date()} />

      <Typography className='mt-6' align='center' color='textSecondary' fontSize='lg'>
        ノートはありません
      </Typography>

      <div className='w-full'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className='mx-auto' src='/images/empty.svg' width='360' height='259' alt='' />
      </div>
    </>
  );
});
// ___________________________________________________________________________
//
NotesList.displayName = 'NotesList';
