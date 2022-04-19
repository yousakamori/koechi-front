import { memo, useEffect, useState } from 'react';
import twemoji from 'twemoji';

const isAppleOS = () => {
  return /(macintosh|macintel|macppc|mac68k|macos|iphone|ipad)/i.test(window.navigator.userAgent);
};

export type EmojiOrTwemojiProps = {
  emoji: string;
};

export const EmojiOrTwemoji: React.VFC<EmojiOrTwemojiProps> = memo(({ emoji }) => {
  const [shouldUseTwemoji, setShouldUseTwemoji] = useState(false);

  useEffect(() => {
    if (isAppleOS() === false) setShouldUseTwemoji(true);
  }, []);

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: shouldUseTwemoji ? twemoji.parse(emoji) : emoji,
      }}
    />
  );
});

EmojiOrTwemoji.displayName = 'EmojiOrTwemoji';
