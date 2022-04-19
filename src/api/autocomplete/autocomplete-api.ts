import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Participant } from '@/types/participant';
// ___________________________________________________________________________
//
export type AutocompleteUsersResponse = {
  users: Participant[];
};
// ___________________________________________________________________________
//
export const autocompleteApi = {
  async users(username: string) {
    return await fetchApi<AutocompleteUsersResponse>(
      `${endpoints.autocompleteUsers}?username=${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
};
