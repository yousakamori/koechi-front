import { Popover } from '@headlessui/react';
import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, PickerProps } from 'emoji-mart';
import { Picker } from 'emoji-mart';
import React from 'react';
import { Emoji } from './emoji';
// ___________________________________________________________________________
//
export type EmojiPickerProps = {
  emoji: string;
  onSelect: (emoji: EmojiData) => void;
  emojiProps?: PickerProps;
};
// ___________________________________________________________________________
//
const propsFactory = (injects?: PickerProps): PickerProps => {
  return {
    exclude: ['flags', 'symbols'],
    i18n: {
      search: '検索',
      categories: {
        search: '検索結果',
        recent: 'よく使う絵文字',
        people: '顔 & 人',
        nature: '動物 & 自然',
        foods: '食べ物 & 飲み物',
        activity: 'アクティビティ',
        places: '旅行 & 場所',
        objects: 'オブジェクト',
        symbols: '記号',
        flags: '旗',
        custom: 'カスタム',
      },
    },
    showSkinTones: false,
    showPreview: false,
    ...injects,
  };
};
// ___________________________________________________________________________
//
export const EmojiPicker: React.VFC<EmojiPickerProps> = ({ emoji, onSelect, emojiProps }) => {
  // ___________________________________________________________________________
  //
  return (
    <Popover className='relative'>
      <>
        <Popover.Button as={React.Fragment}>
          <button className='flex items-center gap-x-4'>
            <Emoji emoji={emoji} />
            <div className='text-sm font-semibold text-left text-secondary-500 hover:text-secondary-700'>
              絵文字を変更する
            </div>
          </button>
        </Popover.Button>

        <Popover.Panel className='absolute z-50 mt-2'>
          <Picker {...propsFactory(emojiProps)} native onSelect={(v: any) => onSelect(v.native)} />
        </Popover.Panel>
      </>
    </Popover>
  );
};
