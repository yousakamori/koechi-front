import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { Typography } from '../ui/typography';
import { notesApi } from '@/api/notes';
import { NoteItem } from '@/components/models/note/';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export type SpaceNotesListProps = {
  slug: string;
  currentPage: number;
};
// ___________________________________________________________________________
//
export const SpaceNotesList: React.VFC<SpaceNotesListProps> = React.memo(
  ({ slug, currentPage }) => {
    const { data, mutate } = useSWR<{ notes: Note[]; next_page: NextPage }, HttpError>(
      `${endpoints.spaceNotes(slug)}?page=${currentPage}`,
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
    return (
      <div className='py-4'>
        <div className='mb-6'>
          {data.notes.length > 0 &&
            data.notes.map((note) => (
              <NoteItem key={note.id} note={note} onDeleteNote={handleDeleteNote} />
            ))}
          {currentPage === 1 && !data.next_page && !data.notes.length && (
            <div className='py-6'>
              <Typography align='center' color='textSecondary' fontSize='lg'>
                ノートはありません
              </Typography>

              <div className='w-full'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className='mx-auto' src='/images/empty.svg' width='360' height='259' alt='' />
              </div>
            </div>
          )}
        </div>
        <Pagination nextPage={data.next_page} />
      </div>
    );
  },
);
// ___________________________________________________________________________
//
SpaceNotesList.displayName = 'SpaceNotesList';
