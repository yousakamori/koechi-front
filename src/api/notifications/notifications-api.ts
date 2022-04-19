import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export type NotificationsResponse = {
  items: Notification[];
  next_page: NextPage;
};
// ___________________________________________________________________________
//
export const notificationsApi = {
  async getNotifications(page?: number) {
    return await fetchApi<NotificationsResponse>(`${endpoints.notifications}?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
