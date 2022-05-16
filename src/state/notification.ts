import { atom } from 'recoil';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export type NotificationState = {
  items: Notification[];
  nextPage?: NextPage;
};
// ___________________________________________________________________________
//
export const notificationState = atom<NotificationState>({
  key: 'Notification',
  default: { items: [], nextPage: undefined },
});
