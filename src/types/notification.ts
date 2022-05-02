import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type Action = 'comment' | 'comment_reply' | 'follow' | 'like';

export type NotifiableType = 'Note' | 'Talk' | 'Comment' | 'Membership' | null;

export type Notification = {
  id: number;
  action: Action;
  action_text: string;
  notifiable_slug: string | null;
  notifiable_title: string | null;
  notifiable_type: NotifiableType;
  datetime: string;
  sender: OmitUser;
};
