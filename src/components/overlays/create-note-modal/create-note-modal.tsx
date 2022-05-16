import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { SelectSpace } from './select-space';
import { notesApi } from '@/api/notes';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { OmitSpace } from '@/types/space';
// ___________________________________________________________________________
//
export type CreateNoteModalProps = {
  open: boolean;
  onClose: () => void;
  postedAt: number;
};
// ___________________________________________________________________________
//
export const CreateNoteModal: React.VFC<CreateNoteModalProps> = ({ open, onClose, postedAt }) => {
  const router = useRouter();
  const [selected, setSelected] = useState<OmitSpace>();
  const [validating, setValidating] = useState(false);
  const { data } = useSWR<{ spaces: OmitSpace[] }, HttpError>(endpoints.mySpacesName, fetchApi);

  const handleCreateNote = useCallback(async () => {
    if (!selected) {
      return;
    }

    setValidating(true);

    try {
      const { slug: noteSlug } = await notesApi.createNote({ spaceSlug: selected.slug, postedAt });

      router.push(`/notes/${noteSlug}/edit`);
    } catch (err) {
      if (err instanceof HttpError) {
        toast.error(err.message);
      } else {
        throw err;
      }
    } finally {
      setValidating(false);
    }
  }, [postedAt, router, selected]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setSelected(data.spaces[0]);
  }, [data]);
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      {!data ? (
        <div className='mt-6'>
          <Spinner color='primary' size='md' />
        </div>
      ) : data.spaces.length > 0 && selected ? (
        <>
          <Typography fontSize='base' color='textPrimary'>
            ノートを作成
          </Typography>

          <div className='mt-6'>
            <SelectSpace values={data.spaces} selected={selected} onChangeSpace={setSelected} />
          </div>

          <div className='mt-6 text-center'>
            <Button
              onClick={handleCreateNote}
              loading={validating}
              variant='contained'
              type='button'
              size='lg'
            >
              作成する
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className='mt-6'>
            <Typography align='center' color='textSecondary' fontSize='sm'>
              まずはスペースを作成してください
            </Typography>
          </div>

          <div className='w-full mt-4'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='mx-auto' src='/images/space.svg' width='240' height='240' alt='' />
          </div>

          <div className='mt-6 text-center'>
            <Link href='/spaces/new' passHref>
              <Button variant='contained' type='button' size='lg'>
                スペースを作成
              </Button>
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
};
