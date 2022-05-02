import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { TalkItem } from '@/components/models/talk/talk-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type UserTalksListProps = {
  username: string;
  isMine: boolean;
  status: string;
};
// ___________________________________________________________________________
//
export const UserTalksList: React.VFC<UserTalksListProps> = React.memo(
  ({ username, isMine, status }) => {
    const statusQuery = ['open', 'closed', 'archived'].includes(status) ? `&status=${status}` : '';

    const swrKey =
      status === 'archived' && isMine
        ? `${endpoints.talksArchived}?`
        : `${endpoints.talks}?order=latest&username=${username}${statusQuery}&`;

    const { data, size, error, setSize } = useSWRInfinite<
      { talks: Talk[]; next_page: NextPage },
      HttpError
    >((index) => `${swrKey}page=${index + 1}`, fetchApi);

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
      isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

    const talks = data ? data.flatMap((v) => v.talks) : [];
    const nextPage: NextPage = data ? data.slice(-1)[0].next_page : null;
    // ___________________________________________________________________________
    //
    if (error) {
      return (
        <div className='mt-3'>
          <p>error</p>
        </div>
      );
    }
    // ___________________________________________________________________________
    //
    if (!data) {
      return (
        <div className='mt-6'>
          <Spinner />
        </div>
      );
    }
    // ___________________________________________________________________________
    //
    if (talks.length) {
      return (
        <>
          <div className='mt-6 bg-white divide-y divide-gray-100 rounded-lg'>
            {talks.map((talk) => (
              <TalkItem key={talk.id} talk={talk} avatar={false} userLink={false} className='p-4' />
            ))}
          </div>

          {nextPage !== null && (
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
      <div className='flex justify-center mt-6'>
        <Typography color='textSecondary' fontSize='lg'>
          トークはありません
        </Typography>
      </div>
    );
  },
);
// ___________________________________________________________________________
//
UserTalksList.displayName = 'UserTalksList';
