export type CurrentUser = {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  twitter_username: string;
  following_user_ids: number[];
  notifications_count: number;
};
