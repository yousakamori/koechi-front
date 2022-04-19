import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Tabs } from './tabs';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
// ___________________________________________________________________________
//
const Account = dynamic<object>(() => import('./account').then((mod) => mod.Account));
const Profile = dynamic<object>(() => import('./profile').then((mod) => mod.Profile));
// ___________________________________________________________________________
//
const SettingsContent: React.VFC = () => {
  const router = useRouter();
  // ___________________________________________________________________________
  //
  switch (router.asPath) {
    case '/settings/account':
      return <Account />;
    case '/settings/profile':
      return <Profile />;
    default:
      return null;
  }
};
// ___________________________________________________________________________
//
export const Settings: React.VFC = withLoginRequired(() => {
  return (
    <Layout>
      <div className='min-h-screen py-10'>
        <Container className='max-w-2xl'>
          <Typography variant='h1'>セッティング</Typography>
          <Tabs />
          <SettingsContent />
        </Container>
      </div>
    </Layout>
  );
});
