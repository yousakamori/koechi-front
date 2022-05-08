export type User = {
  id: number;
  name: string;
  username: string;
  bio: string;
  autolinked_bio: string;
  twitter_username: string;
  avatar_small_url: string;
  avatar_url: string;
  following_user_ids: number[];
  follower_count: number;
  following_count: number;
  total_liked_count: number; // TODO: 未実装
  talks_count: number;
  is_mine: boolean;
};

export type OmitUser = Pick<User, 'id' | 'name' | 'username' | 'avatar_small_url'>;
