import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export const notificationsApi = {
  async getNotifications(page?: number) {
    return await fetchApi<{ items: Notification[]; next_page: NextPage }>(
      `${endpoints.notifications}?page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
};
