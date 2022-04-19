import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export type UsernameTakenResponse = {
  taken: boolean;
};

export type EmailTakenResponse = {
  taken: boolean;
};
// ___________________________________________________________________________
//
export const validatorApi = {
  async usernameTaken(username: string) {
    return await fetchApi<UsernameTakenResponse>(
      `${endpoints.usernameTaken}?username=${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },

  async emailTaken(email: string) {
    return await fetchApi<EmailTakenResponse>(`${endpoints.emailTaken}?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
