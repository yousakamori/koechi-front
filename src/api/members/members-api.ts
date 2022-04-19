import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Member } from '@/types/member';
// ___________________________________________________________________________
//
export const membersApi = {
  async createMember({ slug, username }: { slug: string; username: string }) {
    return await fetchApi<{ member: Member }>(endpoints.spaceMembers(slug), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
  },

  async updateMember({ slug, username, role }: { slug: string; username: string; role: Role }) {
    return await fetchApi<void>(endpoints.spaceMembers(slug), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, role }),
    });
  },

  async deleteMember({ slug, username }: { slug: string; username: string }) {
    return await fetchApi<void>(endpoints.spaceMembers(slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
  },
};
