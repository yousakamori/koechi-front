import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export const currentUserApi = {
  async getCurrentUser() {
    return await fetchApi<CurrentUser>(endpoints.currentUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async resetEmail(values: { email: string }) {
    return await fetchApi<void>(endpoints.email, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updateEmail(values: { token: string; password: string }) {
    return await fetchApi<void>(endpoints.email, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updatePassword(values: { old_password: string; new_password: string }) {
    return await fetchApi<void>(endpoints.password, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updateCurrentUser(values: Partial<CurrentUser> & { password?: string }) {
    return await fetchApi<CurrentUser>(endpoints.currentUser, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updateAvatar(values: FormData) {
    return await fetchApi<CurrentUser>(endpoints.currentUser, {
      method: 'PUT',
      body: values,
    });
  },

  async deleteCurrentUser(values?: { password: string }) {
    const requestHeader = values
      ? {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      : {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        };

    return await fetchApi<void>(endpoints.currentUser, requestHeader);
  },
};
