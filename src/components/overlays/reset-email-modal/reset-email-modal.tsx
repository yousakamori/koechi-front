import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { currentUserApi } from '@/api/current-user';
import { validatorApi } from '@/api/validator';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { endpoints } from '@/config/endpoints';
import { resetEmailSchema } from '@/config/yup-schema';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
// ___________________________________________________________________________
//
export type ResetEmailModalProps = {
  open: boolean;
  onClose: () => void;
};

type UpdateValues = { email: string };
// ___________________________________________________________________________
//
export const ResetEmailModal: React.VFC<ResetEmailModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateValues>({
    mode: 'onChange',
    resolver: yupResolver(resetEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const disabled = !isDirty || !isValid;

  const { data } = useSWR<{ email: string }, HttpError>(endpoints.email, fetchApi, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [validating, setValidating] = useState(false);

  const handleResetEmail = async (values: UpdateValues) => {
    setValidating(true);
    try {
      const { taken } = await validatorApi.emailTaken(values.email);
      if (taken) {
        setError('email', {
          message: `「${values.email}」は登録できません`,
        });
        return;
      }

      await currentUserApi.resetEmail(values);
      toast.success('確認メールを送信しました');
      reset();
      onClose();
    } catch (err) {
      if (err instanceof HttpError) {
        toast.error(err.message);
      }
      throw err;
    } finally {
      setValidating(false);
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      <div className='text-xs text-left text-gray-500'>
        現在のメールアドレスは
        <span className='text-sm px-0.5 font-semibold text-gray-700'>{data?.email}</span>
        です。
      </div>
      <div className='grid mt-6 gap-y-2'>
        <Label htmlFor='email'>新しいメールアドレス</Label>
        <Input {...register('email')} id='email' color='secondary' type='email' fullWidth />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </div>

      <div className='mt-6'>
        <Button
          className='min-w-24'
          loading={validating}
          disabled={disabled}
          variant='contained'
          onClick={handleSubmit(handleResetEmail)}
        >
          変更する
        </Button>
      </div>
    </Modal>
  );
};
