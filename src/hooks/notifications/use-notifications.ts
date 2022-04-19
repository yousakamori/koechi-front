import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useCurrentUser } from '../current-user';
import { notificationsApi } from '@/api/notifications';
import { HttpError } from '@/error/http-error';
import { notificationState } from '@/state/notification';
// ___________________________________________________________________________
//
type GetNotifications = (page?: number) => Promise<void>;
// ___________________________________________________________________________
//
export const useNotifications = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [notification, setNotification] = useRecoilState(notificationState);
  // ___________________________________________________________________________
  //
  const getNotifications = useCallback<GetNotifications>(async (page) => {
    setLoading(true);
    setError(null);

    try {
      const { items, next_page } = await notificationsApi.getNotifications(page);

      setNotification((prev) => ({
        items: [...prev.items, ...items],
        nextPage: next_page,
      }));
      setCurrentUser((prev) => {
        if (prev) {
          return { ...prev, notifications_count: 0 };
        }
      });
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err);
        return;
      }
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ___________________________________________________________________________
  //
  return {
    notification,
    error,
    loading,
    getNotifications,
  };
};
