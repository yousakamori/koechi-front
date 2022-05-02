import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import useSWR from 'swr';
import { NoteItem } from '@/components/models/note/note-item';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { useCurrentUser } from '@/hooks/current-user';
import { fetchApi } from '@/lib/fetch-api';
import { Note } from '@/types/note';
// ___________________________________________________________________________
//
export const HomeNotesList: React.VFC = () => {
  const { authChecking, currentUser } = useCurrentUser();

  const { data } = useSWR<{ notes: Note[]; next_page: NextPage }, HttpError>(
    !authChecking && currentUser ? `${endpoints.myNotes}?count=20` : null,
    fetchApi,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );
  // ___________________________________________________________________________
  //
  if (!authChecking && !currentUser) {
    return <></>;
  }
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
      <div className='min-h-screen py-10 bg-white'>
        <Container className='max-w-5xl'>
          <div className='text-center text-7xl'>📋</div>
          <Typography variant='h2' className='mt-6'>
            最近のノート
          </Typography>

          <div className='block mt-6 md:flex md:items-start md:justify-between md:flex-wrap'>
            {data.notes.map((note) => (
              <div key={note.id} className='block md:w-1/2 md:odd:pr-6 md:even:pl-6'>
                <NoteItem note={note} className='my-1 border-b border-gray-200' />
              </div>
            ))}
          </div>

          <div className='flex items-center justify-center mt-10'>
            <Link href='/me' passHref>
              <Button variant='link' color='secondary' size='lg'>
                もっと見る
                <BiRightArrowAlt className='text-lg text-secondary-500' />
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <div className='flex justify-center mt-6'>
      <Typography color='textSecondary' fontSize='lg'>
        ノートはありません
      </Typography>
    </div>
  );
};
