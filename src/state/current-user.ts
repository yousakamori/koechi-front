import { atom } from 'recoil';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
// undefined : まだログイン確認が完了していない状態とする
// null      : ログイン確認をした結果、ログインしていなかった状態とする
export const currentUserState = atom<undefined | null | CurrentUser>({
  key: 'CurrentUser',
  default: undefined,
});
