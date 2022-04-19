import { throttle } from 'lodash';
import React, { useState, useEffect } from 'react';
import { BiDownArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
// ___________________________________________________________________________
//
export type JumpButtonProps = {
  height: number;
  onScroll: () => void;
};
// ___________________________________________________________________________
//
export const JumpButton: React.VFC<JumpButtonProps> = ({ height, onScroll }) => {
  const offset = 800;
  const [visible, setVisible] = useState(false);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    setClientHeight(document.body.clientHeight);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop } = document.documentElement;
      const hide = scrollTop < offset;

      if (visible !== hide) {
        setVisible(hide);
      }
    }, 200);

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);
  // ___________________________________________________________________________
  //
  if (clientHeight > height && visible) {
    return (
      <div className='fixed left-0 z-30 w-full text-center bottom-8'>
        <Button onClick={onScroll} color='secondary' roundedFull>
          下までジャンプ
          <BiDownArrowAlt className='text-lg bl-2' />
        </Button>
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return <></>;
};
