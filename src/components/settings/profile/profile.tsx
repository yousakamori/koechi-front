import React from 'react';
import { SettingContainer } from '../setting-container';
import { ProfileForm } from './profile-form';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
// ___________________________________________________________________________
//
export const Profile: React.VFC = withLoginRequired(({ currentUser }) => {
  return (
    <Layout customMeta={{ title: 'プロフィール設定' }}>
      <SettingContainer>
        <ProfileForm currentUser={currentUser} />
      </SettingContainer>
    </Layout>
  );
});
