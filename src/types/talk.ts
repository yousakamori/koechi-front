import { OmitUser, User } from '@/types/user';
// ___________________________________________________________________________
//
export type Talk = {
  id: number;
  title: string;
  slug: string;
  archived: boolean;
  closed: boolean;
  closed_at: string | null;
  created_at: string;
  comments_count: number;
  liked_count: number;
  last_comment_created_at: string | null;
  user: OmitUser;
};

export type TalkDetails = {
  id: number;
  title: string;
  slug: string;
  archived: boolean;
  closed: boolean;
  closed_at: string | null;
  comments_count: number;
  liked_count: number;
  last_comment_created_at: string | null;
  created_at: string;
  is_mine: boolean;
  current_user_liked: boolean;
  user: Pick<
    User,
    | 'id'
    | 'name'
    | 'username'
    | 'avatar_small_url'
    | 'avatar_url'
    | 'autolinked_bio'
    | 'twitter_username'
  >;
};
