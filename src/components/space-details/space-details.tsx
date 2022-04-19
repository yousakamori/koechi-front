import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { SpaceDetailsHeader } from './space-details-header';
import { SpaceMembersList } from './space-members-list';
import { SpaceNotesList } from './space-notes-list';
import { SpaceTabs } from './space-tabs';
import { spacesApi } from '@/api/spaces';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { EditValues } from '@/components/overlays/edit-space-modal';
import { Container } from '@/components/ui/container';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import Error from '@/pages/_error';
import { SpaceDetails as SpaceDetailsType } from '@/types/space';
// ___________________________________________________________________________
//
export const SpaceDetails: React.VFC = withLoginRequired(() => {
  const router = useRouter();
  const [validating, setValidating] = useState(false);
  const { slug, page, tab } = router.query as { slug: string; page: string; tab: string };
  const currentPage = Number(page) || 1;

  const tabs = [
    { name: 'ノート', route: `/spaces/${slug}`, active: tab !== 'members' },
    {
      name: 'メンバー',
      route: `/spaces/${slug}?tab=members`,
      active: tab === 'members',
    },
  ];

  const { data, error, mutate } = useSWR<{ space: SpaceDetailsType }, HttpError>(
    slug ? endpoints.space(slug) : null,
    fetchApi,
  );

  const handleUpdateSpace = useCallback(
    async (values: EditValues) => {
      if (!data) {
        return;
      }

      setValidating(true);
      try {
        await spacesApi.updateSpace(values);

        let message = '更新しました';

        if (!data.space.archived && values.archived) {
          message = 'アーカイブにしました';
        }

        if (data.space.archived && !values.archived) {
          message = 'アーカイブを解除しました';
        }

        mutate({ space: { ...data.space, ...values } }, false);
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
      <NextSeo title={data.space.name} titleTemplate='%s' />

      <Layout>
        <div className='min-h-screen'>
          <Container className='max-w-4xl'>
            <SpaceDetailsHeader
              space={data.space}
              validating={validating}
              onUpdateSpace={handleUpdateSpace}
            />

            <SpaceTabs slug={slug} tabs={tabs} />

            {tab === 'members' ? (
              // members
              <SpaceMembersList slug={slug} />
            ) : (
              // notes
              <SpaceNotesList slug={slug} currentPage={currentPage} />
            )}
          </Container>
        </div>
      </Layout>
    </>
  );
});
