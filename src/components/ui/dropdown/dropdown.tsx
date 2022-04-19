import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
// ___________________________________________________________________________
//
export type DropdownProps = {
  buttonContent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'center' | 'right';
};
// ___________________________________________________________________________
//
export const Dropdown: React.VFC<DropdownProps> = ({
  buttonContent,
  children,
  className,
  position = 'right',
}) => {
  const classes = clsx(
    'absolute',
    'z-30',
    'mt-2',
    'overflow-hidden',
    'origin-top-right',
    'bg-white',
    'divide-y',
    'divide-gray-100',
    'rounded-md',
    'shadow-lg',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'focus:outline-none',
    position === 'right' && 'right-0',
    position === 'left' && 'left-0',
    position === 'center' && ['left-1/2', '-translate-x-1/2'],
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {buttonContent}
      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className={classes}>{children}</Menu.Items>
      </Transition>
    </Menu>
  );
};
