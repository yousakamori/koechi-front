import { OmitUser } from './user';
// ___________________________________________________________________________
//
export type Space = {
  id: number;
  name: string;
  emoji: string;
  slug: string;
  archived: boolean;
  favorite: boolean;
  updated_at: string;
  created_at: string;
  notes_count: number;
  is_mine: boolean;
  user: OmitUser;
};

export type SpaceDetails = Space & { role: Role };
export type OmitSpace = Pick<SpaceDetails, 'id' | 'name' | 'emoji' | 'slug'>;
