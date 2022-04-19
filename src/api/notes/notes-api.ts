import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export const notesApi = {
  async updateNote({
    slug,
    ...rest
  }: {
    slug: string;
    title: string;
    body_text: string;
    body_json: string;
    posted_at: string;
  }) {
    return await fetchApi<void>(endpoints.note(slug), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    });
  },

  async createNote({ spaceSlug, postedAt }: { spaceSlug: string; postedAt: number }) {
    return await fetchApi<{ slug: string }>(endpoints.spaceNotes(spaceSlug), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posted_at: postedAt }),
    });
  },

  async deleteNote(slug: string) {
    return await fetchApi<void>(endpoints.note(slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
