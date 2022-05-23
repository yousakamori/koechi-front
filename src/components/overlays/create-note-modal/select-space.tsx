import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { HiSelector } from 'react-icons/hi';
import { EmojiOrTwemoji } from '@/components/ui/emoji-or-twemoji';
import { OmitSpace } from '@/types/space';
// ___________________________________________________________________________
//
export type SelectSpaceProps = {
  values: OmitSpace[];
  selected: OmitSpace;
  onChangeSpace: (v: OmitSpace) => void;
};
// ___________________________________________________________________________
//
export const SelectSpace: React.VFC<SelectSpaceProps> = ({ values, selected, onChangeSpace }) => {
  // ___________________________________________________________________________
  //
  return (
    <Listbox value={selected} onChange={onChangeSpace}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium text-gray-700'>
            スペースを選択
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm'>
              <span className='flex items-center'>
                <div className='w-5 h-5'>
                  <EmojiOrTwemoji className='w-4 h-4 text-sm' emoji={selected.emoji} />
                </div>
                <div className='ml-1 truncate'>{selected.name}</div>
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none'>
                <HiSelector className='w-5 h-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={React.Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {values.map((value) => (
                  <Listbox.Option
                    key={value.id}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-white bg-primary-400' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <div className='w-5 h-5'>
                            <EmojiOrTwemoji className='w-4 h-4 text-sm' emoji={value.emoji} />
                          </div>

                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-1 block truncate',
                            )}
                          >
                            {value.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <BiCheck className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
