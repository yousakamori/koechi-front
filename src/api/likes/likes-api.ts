import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Like } from '@/types/like';
// ___________________________________________________________________________
//
export type CreateLikeRequest = {
  liked: boolean;
  likable_id: number;
  likable_type: 'Comment' | 'Talk' | 'Note';
};
// ___________________________________________________________________________
//
export const likesApi = {
  async createLike(values: CreateLikeRequest) {
    return await fetchApi<Like>(endpoints.likes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },
};
