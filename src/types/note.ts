import { SpaceDetails } from './space';
import { OmitUser } from './user';
// ___________________________________________________________________________
//
export type Note = {
  id: number;
  title: string;
  body_letters_count: number;
  body_text: string;
  slug: string;
  posted_at: string;
  comments_count: number;
  is_mine: boolean;
  created_at: string;
  space: Pick<SpaceDetails, 'slug' | 'emoji' | 'role'>;
  user: OmitUser;
};

export type NoteDetails = Omit<Note, 'space'> & {
  body_json: string;
  body_updated_at: string;
  last_comment_created_at: string | null;
  liked_count: number;
  updated_at: string;
};
