import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { CircleButton } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { APP_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
const HeaderAction = dynamic<object>(() =>
  import('@/components/common/header/header-action').then((mod) => mod.HeaderAction),
);
// ___________________________________________________________________________
//
export const Header: React.VFC = () => {
  return (
    <header className='bg-white'>
      <Container>
        <div className='flex items-center justify-between h-16'>
          <Link href='/'>
            <a className='flex items-center space-x-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src='/images/logo.svg' width='140' height='32' alt={APP_NAME} />
            </a>
          </Link>
          <div className='flex items-center'>
            <Link href='/search' passHref>
              <CircleButton size='md' color='secondary'>
                <BiSearch />
              </CircleButton>
            </Link>
            <HeaderAction />
          </div>
        </div>
      </Container>
    </header>
  );
};
