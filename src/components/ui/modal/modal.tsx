import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { BiX } from 'react-icons/bi';
import { CircleButton } from '@/components/ui/button';
// ___________________________________________________________________________
//
export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closable?: boolean;
};
// ___________________________________________________________________________
//
export const Modal: React.VFC<ModalProps> = ({ open, children, onClose, closable = true }) => {
  // ___________________________________________________________________________
  //
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as='div' className='fixed inset-0 z-40 overflow-y-auto' onClose={onClose}>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-full px-4 pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:p-6'>
              {closable && (
                <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                  <CircleButton onClick={onClose} color='secondary'>
                    <span className='sr-only'>閉じる</span>
                    <BiX aria-hidden='true' />
                  </CircleButton>
                </div>
              )}

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
