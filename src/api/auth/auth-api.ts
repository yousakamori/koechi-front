import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export const authApi = {
  async signup(values: { email: string }) {
    return await fetchApi<void>(endpoints.signUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async login(values: { email?: string; token?: string; password: string }) {
    return await fetchApi<CurrentUser>(endpoints.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async logout() {
    return await fetchApi<void>(endpoints.logout, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
