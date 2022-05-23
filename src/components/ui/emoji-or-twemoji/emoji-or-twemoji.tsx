import { memo, useEffect, useState } from 'react';
import twemoji from 'twemoji';

const isAppleOS = () => {
  return /(macintosh|macintel|macppc|mac68k|macos|iphone|ipad)/i.test(window.navigator.userAgent);
};

export type EmojiOrTwemojiProps = {
  emoji: string;
  className?: string;
};

export const EmojiOrTwemoji: React.VFC<EmojiOrTwemojiProps> = memo(({ emoji, className }) => {
  const [shouldUseTwemoji, setShouldUseTwemoji] = useState(false);

  useEffect(() => {
    if (isAppleOS() === false) setShouldUseTwemoji(true);
  }, []);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: shouldUseTwemoji ? twemoji.parse(emoji) : emoji,
      }}
    />
  );
});

EmojiOrTwemoji.displayName = 'EmojiOrTwemoji';
