import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Comment } from '@/types/comment';
import { Participant } from '@/types/participant';
import { Talk, TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
export type TalkResponse = {
  talk: TalkDetails;
  comments: Comment[];
  participants: Participant[];
};

export type TalksResponse = {
  talks: Talk[];
  next_page: NextPage;
};
// ___________________________________________________________________________
//
export const talksApi = {
  async getTalks(query: string) {
    return await fetchApi<TalksResponse>(`${endpoints.talks}${query ? `?${query}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async getTalksArchived() {
    return await fetchApi<TalksResponse>(endpoints.talksArchived, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async getTalk(slug: string, cookie = '') {
    return await fetchApi<TalkResponse>(endpoints.talk(slug), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    });
  },

  async createTalk(values: { title: string }) {
    return await fetchApi<{ talk: TalkDetails }>(endpoints.talks, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  },

  async updateTalk({ slug, ...rest }: Pick<TalkDetails, 'slug' | 'title' | 'closed' | 'archived'>) {
    return await fetchApi<void>(endpoints.talk(slug), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    });
  },

  async deleteTalk(slug: string) {
    return await fetchApi<void>(endpoints.talk(slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
