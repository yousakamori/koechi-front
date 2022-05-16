import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { spacesApi } from '@/api/spaces';
import { SpaceCard } from '@/components/models/space';
import { EditValues } from '@/components/overlays/edit-space-modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Space } from '@/types/space';
// ___________________________________________________________________________
//
export type SpacesProps = {
  status: string | undefined;
};
// ___________________________________________________________________________
//
export const Spaces: React.VFC<SpacesProps> = React.memo(({ status }) => {
  const archived = status === 'archived';
  const [validating, setValidating] = useState(false);
  const { data, mutate } = useSWR<{ spaces: Space[] }, HttpError>(endpoints.mySpaces, fetchApi);

  const filteredSpace = useMemo(
    () => (data ? data.spaces.filter((space) => space.archived === archived) : []),
    [archived, data],
  );

  const handleUpdateSpace = useCallback(
    async (values: EditValues) => {
      if (!data) {
        return;
      }

      setValidating(true);
      try {
        await spacesApi.updateSpace(values);

        const space = data.spaces.find((space) => space.slug === values.slug);

        let message = '更新しました';

        if (space && !space.archived && values.archived) {
          message = 'アーカイブにしました';
        }

        if (space && space.archived && !values.archived) {
          message = 'アーカイブを解除しました';
        }

        mutate(
          {
            spaces: data.spaces.map((space) =>
              space.slug === values.slug ? { ...space, ...values } : space,
            ),
          },

          false,
        );

        toast.success(message);
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
    [data, mutate],
  );

  const handleDeleteSpace = useCallback(
    async (slug: string) => {
      if (!data) {
        return;
      }
      setValidating(true);
      try {
        await spacesApi.deleteSpace(slug);
        mutate({ spaces: data.spaces.filter((space) => space.slug !== slug) }, false);
        toast.success('スペースを削除しました');
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
    [data, mutate],
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
  if (!data.spaces.length) {
    return (
      <>
        <div className='flex justify-center mt-6'>
          <Typography color='textSecondary' fontSize='lg'>
            最初のスペースを作りましょう
          </Typography>
        </div>
        <div className='w-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='mx-auto' src='/images/space.svg' width='340' height='340' alt='' />
        </div>
        <div className='text-center'>
          <Link href='/spaces/new' passHref>
            <Button size='lg'>新しく作成</Button>
          </Link>
        </div>
      </>
    );
  }
  // ___________________________________________________________________________
  //
  if (!filteredSpace.length) {
    return (
      <div className='mt-6'>
        <Typography color='textSecondary'>スペースはありません</Typography>
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <div className='grid grid-cols-2 gap-4 mt-6 md:grid-cols-3 lg:grid-cols-4'>
      {filteredSpace.map((space) => (
        <SpaceCard
          key={space.id}
          space={space}
          validating={validating}
          onUpdateSpace={handleUpdateSpace}
          onDeleteSpace={handleDeleteSpace}
        />
      ))}
    </div>
  );
});
// ___________________________________________________________________________
//
Spaces.displayName = 'Spaces';
