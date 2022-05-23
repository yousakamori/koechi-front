import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
// ___________________________________________________________________________
//
const Tabs: React.VFC = () => {
  const router = useRouter();
  const links = [
    { name: 'アカウント', href: '/settings/account' },
    { name: 'プロフィール', href: '/settings/profile' },
  ];
  // ___________________________________________________________________________
  //
  return (
    <div className='flex items-center mt-8 overflow-x-auto border-b border-gray-200 whitespace-nowrap'>
      {links.map((link) => (
        <Link key={link.name} href={link.href}>
          <a
            className={`px-4 py-2 font-semibold text-sm${
              link.href === router.asPath
                ? ' border-b-2 border-primary-500 text-primary-500'
                : ' text-gray-400'
            }`}
          >
            {link.name}
          </a>
        </Link>
      ))}
    </div>
  );
};
// ___________________________________________________________________________
//
export type SettingContainerProps = { children: React.ReactNode };
// ___________________________________________________________________________
//
export const SettingContainer: React.VFC<SettingContainerProps> = ({ children }) => {
  return (
    <div className='min-h-screen py-10'>
      <Container className='max-w-2xl'>
        <Typography variant='h1'>セッティング</Typography>
        <Tabs />
        {children}
      </Container>
    </div>
  );
};
