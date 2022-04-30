import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
export type DeleteCurrentUserRequest = {
  password?: string;
};

export type UpdateCurrentUserRequest = {
  name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  twitter_username?: string;
  password?: string;
};
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

  async updateCurrentUser(values: UpdateCurrentUserRequest) {
    return await fetchApi<CurrentUser>(endpoints.currentUser, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },

  async updateAvatar(values: FormData) {
    return await fetchApi<CurrentUser>(endpoints.currentUser, {
      method: 'PUT',
      body: values,
    });
  },

  async deleteCurrentUser(values?: DeleteCurrentUserRequest) {
    return await fetchApi<void>(endpoints.currentUser, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },
};
