import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { UserCommentsItem } from './user-comments-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { UserComment } from '@/types/comment';
import { User } from '@/types/user';
// ___________________________________________________________________________
//
export type UserCommentsListProps = {
  username: string;
  user: User;
};
// ___________________________________________________________________________
//
export const UserCommentsList: React.VFC<UserCommentsListProps> = React.memo(
  ({ username, user }) => {
    const { data, size, error, setSize } = useSWRInfinite<
      { comments: UserComment[]; next_page: NextPage },
      HttpError
    >((index) => `${endpoints.userComments(username)}?page=${index + 1}`, fetchApi);

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
      isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

    const comments = data ? data.flatMap((v) => v.comments) : [];
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
        <div className='mt-3'>
          <Spinner />
        </div>
      );
    }
    // ___________________________________________________________________________
    //
    if (comments.length) {
      return (
        <>
          <div className='mt-3 bg-white divide-y divide-gray-100 rounded-lg'>
            {comments.map((comment) => (
              <UserCommentsItem key={comment.id} comment={comment} user={user} />
            ))}
          </div>
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
      <div className='flex justify-center mt-3'>
        <Typography color='textSecondary' fontSize='lg'>
          コメントはありません
        </Typography>
      </div>
    );
  },
);
// ___________________________________________________________________________
//
UserCommentsList.displayName = 'UserCommentsList';
