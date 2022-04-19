import { endpoints } from '@/config/endpoints';
import { fetchApi } from '@/lib/fetch-api';
import { Comment } from '@/types/comment';
// ___________________________________________________________________________
//
export type CreateCommentRequest = {
  body_json: string;
  body_text: string;
  commentable_id: number;
  commentable_type: 'Talk' | 'Note';
  parent_id?: number;
};

export type UpdateCommentRequest = {
  slug: string;
  body_json: string;
  body_text: string;
};
// ___________________________________________________________________________
//
export const commentsApi = {
  async createComment(values: CreateCommentRequest) {
    return await fetchApi<{ comment: Comment }>(endpoints.comments, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values }),
    });
  },

  async updateComment({ slug, body_json, body_text }: UpdateCommentRequest) {
    return await fetchApi<{ comment: Comment }>(endpoints.comment(slug), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body_json, body_text }),
    });
  },

  async deleteComment(slug: string) {
    return await fetchApi<void>(endpoints.comment(slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
