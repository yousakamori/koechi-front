import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type Comment = {
  id: number;
  body_text: string;
  body_json: string;
  updated_at: string;
  created_at: string;
  body_updated_at: string | null;
  user_id: number;
  parent_id: number | null;
  slug: string;
  children: Comment[] | null;
  liked_count: number;
  is_mine: boolean;
  current_user_liked: boolean;
  user: OmitUser;
};

export type Commentable = {
  id: number;
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  created_at: string;
  updated_at: string;
};

export type UserComment = {
  id: number;
  title: string;
  reply: boolean;
  commentable_id: number;
  commentable_type: 'Talk' | 'Note';
  parent_id: number;
  slug: string;
  created_at: string;
  liked_count: number;
  commentable: Commentable;
};
