// TODO: 未使用
import { useEffect, useRef } from 'react';
// ___________________________________________________________________________
//
export const useKeypress = (key: string, handler: () => void) => {
  const savedHandler = useRef(handler);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        savedHandler.current();
      }
    };
    document.addEventListener('keyup', onKeyup);
    return () => document.removeEventListener('keyup', onKeyup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
