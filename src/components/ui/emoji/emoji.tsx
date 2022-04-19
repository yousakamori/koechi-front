import { Emoji as EmojiMart, getEmojiDataFromNative } from 'emoji-mart';
import data from 'emoji-mart/data/all.json';
import React, { useMemo } from 'react';
// ___________________________________________________________________________
//
export type EmojiProps = {
  emoji: string;
  size?: number;
};
// ___________________________________________________________________________
//
const isAppleOS = () => {
  return /(macintosh|macintel|macppc|mac68k|macos|iphone|ipad)/i.test(window.navigator.userAgent);
};
// ___________________________________________________________________________
//
export const Emoji: React.VFC<EmojiProps> = ({ emoji, size = 64 }) => {
  const emojiData = useMemo(() => getEmojiDataFromNative(emoji, 'twitter', data), [emoji]);
  // ___________________________________________________________________________
  //

  return <EmojiMart set='twitter' native={isAppleOS()} emoji={emojiData} size={size} />;
};
