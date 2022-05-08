import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export type CheckTokenResponse = {
  valid_token: boolean;
};
// ___________________________________________________________________________
//
export const resetPasswordApi = {
  async resetPassword(values: { email: string }) {
    return await fetchApi<void>(endpoints.resetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updatePassword(values: { token: string; password: string }) {
    return await fetchApi<void>(endpoints.resetPassword, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async checkToken(token: string) {
    return await fetchApi<CheckTokenResponse>(`${endpoints.checkToken}?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
