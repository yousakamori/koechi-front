import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { UpdateValues } from './edit-note';
import { Button, CircleButton } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { DatePickerProps } from '@/components/ui/date-picker/date-picker';
// ___________________________________________________________________________
//
const DatePicker = dynamic<DatePickerProps>(() =>
  import('@/components/ui/date-picker/date-picker').then((mod) => mod.DatePicker),
);
// ___________________________________________________________________________
//
export type EditNoteHeaderProps = {
  validating: boolean;
  onUpdate: (v: UpdateValues) => void;
  onClickBack: () => void;
};
// ___________________________________________________________________________
//
export const EditNoteHeader: React.VFC<EditNoteHeaderProps> = ({
  validating,
  onUpdate,
  onClickBack,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext();

  const disabled = !isDirty || !isValid;
  // ___________________________________________________________________________
  //
  return (
    <div className='h-16'>
      <header className='fixed top-0 left-0 z-20 w-full bg-white shadow'>
        <Container className='max-w-6xl'>
          <div className='flex items-center justify-between h-16'>
            <CircleButton onClick={onClickBack} color='secondary'>
              <BiArrowBack />
            </CircleButton>

            <div className='flex items-center space-x-5'>
              <Controller
                render={({ field: { onChange, value } }) => {
                  if (!value) {
                    return <></>;
                  }

                  return (
                    <DatePicker
                      selected={new Date(value)}
                      dateFormat='yyyy年MM月dd日'
                      onSelect={(v) => onChange(v.toISOString())}
                    />
                  );
                }}
                name='posted_at'
                control={control}
              />

              <Button onClick={handleSubmit(onUpdate)} loading={validating} disabled={disabled}>
                保存する
              </Button>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};
