import { Space } from './space';
import { OmitUser } from './user';
// ___________________________________________________________________________
//
export type Likable = 'Note' | 'Talk' | 'Comment';

export type Like = {
  liked: boolean;
};

export type MyLike = {
  id: number;
  emoji: string | null;
  title: string;
  shortlink_path: string;
  slug: string;
  post_type: Likable;
  posted_at: string;
  liked_count: number;
  user: OmitUser;
  space: Pick<Space, 'emoji' | 'slug'> | null;
};
