import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdatePasswordRequest } from '@/api/current-user';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { updatePasswordSchema } from '@/config/yup-schema';
import { usePassword } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export type ResetPasswordModalProps = {
  open: boolean;
  onClose: () => void;
};
// ___________________________________________________________________________
//
export const ResetPasswordModal: React.VFC<ResetPasswordModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdatePasswordRequest>({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirm: '',
    },
  });

  const disabled = !isDirty || !isValid;
  const { validating, updatePassword } = usePassword();

  const handleUpdatePassword = async (values: UpdatePasswordRequest) => {
    const { error } = await updatePassword(values);
    if (error) {
      setError('old_password', { message: error.message });
    } else {
      toast.success('パスワードを変更しました');
      reset();
      onClose();
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      <div className='grid mt-6 gap-y-2'>
        <Label htmlFor='old-password'>現在のパスワード</Label>
        <Input
          {...register('old_password')}
          id='old-password'
          color='secondary'
          type='password'
          fullWidth
        />
        <ErrorMessage>{errors.old_password?.message}</ErrorMessage>
      </div>

      <div className='grid mt-6 gap-y-2'>
        <Label htmlFor='new-password'>新しいパスワード</Label>
        <Input
          {...register('new_password')}
          id='new-password'
          color='secondary'
          type='password'
          fullWidth
        />
        <ErrorMessage>{errors.new_password?.message}</ErrorMessage>
      </div>

      <div className='grid mt-6 gap-y-2'>
        <Label htmlFor='new-password-confirm'>新しいパスワードの再入力</Label>
        <Input
          {...register('new_password_confirm')}
          id='new-password-confirm'
          color='secondary'
          type='password'
          fullWidth
        />
        <ErrorMessage>{errors.new_password_confirm?.message}</ErrorMessage>
      </div>

      <div className='mt-6'>
        <Button
          className='min-w-24'
          loading={validating}
          disabled={disabled}
          variant='contained'
          onClick={handleSubmit(handleUpdatePassword)}
        >
          変更する
        </Button>
      </div>
    </Modal>
  );
};
