import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export type ResetPasswordRequest = {
  email: string;
};

export type UpdatePasswordRequest = {
  token: string;
  password: string;
  password_confirm: string;
};

export type CheckTokenRequest = {
  token: string;
};

export type CheckTokenResponse = {
  valid_token: boolean;
};
// ___________________________________________________________________________
//
export const resetPasswordApi = {
  async resetPassword(values: ResetPasswordRequest) {
    return await fetchApi<void>(endpoints.resetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },

  async updatePassword({ token, password }: UpdatePasswordRequest) {
    return await fetchApi<void>(endpoints.resetPassword, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
  },

  async checkToken({ token }: CheckTokenRequest) {
    return await fetchApi<CheckTokenResponse>(`${endpoints.checkToken}?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
