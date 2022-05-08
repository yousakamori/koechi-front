import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type CommentableType = 'Talk' | 'Note';

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
  children?: Comment[];
  is_mine: boolean;
  current_user_liked: boolean;
  liked_count: number;
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
  slug: string;
  created_at: string;
  liked_count: number;
  commentable: Commentable;
};
