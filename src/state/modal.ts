import { atom } from 'recoil';
import { Modal } from '@/types/modal';
// ___________________________________________________________________________
//
export const modalState = atom<Modal>({
  key: 'Modal',
  default: {
    open: false,
    closable: false,
    contentsNode: undefined,
  },
});
