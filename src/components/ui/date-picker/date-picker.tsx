import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Days } from '@/components/ui/date-picker/days';
import { Modal } from '@/components/ui/modal';
import { useToggle } from '@/hooks/toggle';
// ___________________________________________________________________________
//
export type DatePickerProps = {
  selected?: Date | null;
  dateFormat?: string;
  onSelect(date: Date): void;
};
// ___________________________________________________________________________
//
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ selected, dateFormat = 'yyyy/MM/dd', onSelect }, inputRef) => {
    const [currentDate, setCurrentDate] = useState('');
    const [open, toggleModal] = useToggle();

    const handleSelectDate = (date: Date) => {
      setCurrentDate(format(date, dateFormat));
      onSelect(date);
    };

    useEffect(() => {
      if (!selected) {
        return;
      }
      setCurrentDate(format(selected, dateFormat));
    }, [dateFormat, selected]);
    // ___________________________________________________________________________
    //
    return (
      <>
        <input
          ref={inputRef}
          type='text'
          value={currentDate}
          readOnly
          className='w-32 py-2 font-semibold text-gray-600 cursor-pointer focus:outline-none'
          placeholder='日付を選択'
          onClick={toggleModal}
        />

        <Modal open={open} onClose={toggleModal} closable={false}>
          <Days
            handleSelectDate={handleSelectDate}
            handleClose={toggleModal}
            currentDate={selected || new Date()}
          />
        </Modal>
      </>
    );
  },
);
// ___________________________________________________________________________
//
DatePicker.displayName = 'DatePicker';
