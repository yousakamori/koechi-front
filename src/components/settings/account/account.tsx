import React from 'react';
import { SettingContainer } from '../setting-container';
import { AccountForm } from './account-form';
import { Layout } from '@/components/common/layout';
import { withLoginRequired } from '@/components/hoc/with-login-required';
// ___________________________________________________________________________
//
export const Account: React.VFC = withLoginRequired(({ currentUser }) => {
  return (
    <Layout customMeta={{ title: 'アカウント設定' }}>
      <SettingContainer>
        <AccountForm currentUser={currentUser} />
      </SettingContainer>
    </Layout>
  );
});
