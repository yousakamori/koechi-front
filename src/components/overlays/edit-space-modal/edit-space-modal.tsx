import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { EmojiPicker } from '@/components/ui/emoji';
import { ErrorMessage } from '@/components/ui/error-message';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { createSpaceSchema } from '@/config/yup-schema';
import { Space, SpaceDetails } from '@/types/space';
// ___________________________________________________________________________
//
export type EditValues = Pick<Space, 'slug' | 'name' | 'emoji' | 'archived'>;
export type UpdateSpace = (v: EditValues) => Promise<void>;

export type EditSpaceModalProps = {
  space: Space | SpaceDetails;
  open: boolean;
  validating: boolean;
  onClose: () => void;
  onUpdate: UpdateSpace;
};
// ___________________________________________________________________________
//
export const EditSpaceModal: React.VFC<EditSpaceModalProps> = ({
  space,
  open,
  validating,
  onClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<EditValues>({
    mode: 'onChange',
    resolver: yupResolver(createSpaceSchema),
    defaultValues: {
      name: space.name,
      slug: space.slug,
      emoji: space.emoji,
      archived: space.archived,
    },
  });

  const disabled = !isDirty || !isValid;

  const handleUpdate = async (values: EditValues) => {
    await onUpdate({ ...space, ...values });
    reset(values);
    onClose();
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      <Typography fontSize='base' color='textPrimary'>
        スペースを変更
      </Typography>
      <div className='mt-4 text-sm text-left text-gray-500'>絵文字と名前の変更ができます</div>
      <div className='mt-8'>
        <Controller
          render={({ field: { onChange, value } }) => (
            <EmojiPicker emoji={value} onSelect={onChange} />
          )}
          name='emoji'
          control={control}
          rules={{ required: true }}
        />

        <div className='grid mt-6 gap-y-2'>
          <Label htmlFor='name'>スペースの名前</Label>
          <div className='overflow-hidden bg-white border border-gray-200 rounded-lg shadow'>
            <Textarea
              {...register('name')}
              autoFocus
              id='name'
              fullWidth
              className='px-3 py-2 text-lg font-medium'
              variant='none'
              minRows={2}
              maxRows={4}
            />
          </div>

          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className='mt-6 text-center'>
          <Button
            onClick={handleSubmit(handleUpdate)}
            loading={validating}
            disabled={disabled}
            variant='contained'
            type='button'
            size='lg'
          >
            更新する
          </Button>
        </div>
      </div>
    </Modal>
  );
};
