import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Space } from '@/types/space';
// ___________________________________________________________________________
//
export const spacesApi = {
  async createSpace(values: Pick<Space, 'name' | 'emoji'>) {
    return await fetchApi<{ space: Space }>(endpoints.spaces, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },

  async updateSpace({
    slug,
    name,
    emoji,
    archived = false,
  }: Pick<Space, 'slug' | 'name' | 'emoji' | 'archived'>) {
    return await fetchApi<void>(endpoints.space(slug), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, emoji, archived }),
    });
  },

  async deleteSpace(slug: string) {
    return await fetchApi<void>(endpoints.space(slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
