import { useCallback, useState } from 'react';
import { usersApi } from '@/api/users';
import { HttpError } from '@/error/http-error';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
type Follow = (otherUserId: number) => Promise<{ error?: HttpError }>;
type Unfollow = (otherUserId: number) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useFollow = () => {
  const [validating, setValidating] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();

  const follow = useCallback<Follow>(
    async (otherUserId) => {
      setValidating(true);

      try {
        await usersApi.follow(otherUserId);
        setCurrentUser((prev) => {
          if (prev) {
            return {
              ...prev,
              following_user_ids: [...prev.following_user_ids, otherUserId],
            };
          }
        });

        return {};
      } catch (err) {
        if (err instanceof HttpError) {
          return { error: err };
        }
        throw err;
      } finally {
        setValidating(false);
      }
    },
    [setCurrentUser],
  );

  const unfollow = useCallback<Unfollow>(
    async (otherUserId: number) => {
      setValidating(true);

      try {
        await usersApi.unfollow(otherUserId);

        setCurrentUser((prev) => {
          if (prev) {
            return {
              ...prev,
              following_user_ids: prev.following_user_ids.filter((id) => id !== otherUserId),
            };
          }
        });
        return {};
      } catch (err) {
        if (err instanceof HttpError) {
          return { error: err };
        }
        throw err;
      } finally {
        setValidating(false);
      }
    },
    [setCurrentUser],
  );

  const isFollowing = (otherUserId: number) => {
    if (!currentUser) {
      return false;
    }

    return currentUser.following_user_ids.includes(otherUserId);
  };
  // ___________________________________________________________________________
  //
  return {
    follow,
    unfollow,
    validating,
    isFollowing,
  };
};
