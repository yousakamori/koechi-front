import { atom } from 'recoil';
import { Notification } from '@/types/notification';
// ___________________________________________________________________________
//
export type NotificationState = {
  // TODO: typeこれでいいのかな
  items: Notification[];
  nextPage?: NextPage;
};
// ___________________________________________________________________________
//
export const notificationState = atom<NotificationState>({
  key: 'Notification',
  default: { items: [], nextPage: undefined },
});
