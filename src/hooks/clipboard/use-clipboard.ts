import { useCallback, useEffect, useState } from 'react';

export const useClipboard = (timeout = 1500) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
    } catch (err) {
      setHasCopied(false);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (hasCopied) {
      timeoutId = setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeout, hasCopied]);

  return { copy, hasCopied };
};
