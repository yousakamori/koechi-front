import { Participant } from './participant';

export type Member = Participant & {
  role: Role;
  is_owner: boolean;
};
