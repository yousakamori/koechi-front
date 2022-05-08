import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { User } from '@/types/user';
// ___________________________________________________________________________
//
export const usersApi = {
  async getUser(username: string, cookie = '') {
    return await fetchApi<{ user: User }>(endpoints.user(username), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    });
  },

  async follow(user_id: number) {
    return await fetchApi<void>(endpoints.follow, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ user_id }),
    });
  },

  async unfollow(user_id: number) {
    await fetchApi<void>(endpoints.unfollow, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });
  },
};
