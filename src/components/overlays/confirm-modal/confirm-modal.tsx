import React from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
// ___________________________________________________________________________
//
export type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
};
// ___________________________________________________________________________
//
export const ConfirmModal: React.VFC<ConfirmModalProps> = ({
  title,
  description,
  open,
  cancelText = 'キャンセル',
  confirmText = '削除する',
  onClose,
  onConfirm,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      {title && <div className='text-lg font-semibold text-gray-800'>{title}</div>}

      {description && <div className='mt-2 text-sm text-left text-gray-500'>{description}</div>}

      <div className='flex justify-end mt-4 space-x-3'>
        <Button onClick={onClose} color='secondary' variant='outlined' type='button'>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color='error' variant='outlined' type='button'>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
