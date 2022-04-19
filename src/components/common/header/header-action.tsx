import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonAddNew } from '@/components/common/header/button-add-new';
import { UserMenu } from '@/components/common/header/user-menu';
import { UserNotification } from '@/components/common/header/user-notification';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const HeaderAction: React.VFC = () => {
  const { authChecking, currentUser } = useCurrentUser();
  const { validating, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  // ___________________________________________________________________________
  //
  if (authChecking) {
    return null;
  }
  // ___________________________________________________________________________
  //
  if (currentUser && !currentUser.username) {
    return (
      <Link href={'/onboarding'} passHref>
        <Button color='secondary' variant='link' size='lg' className='ml-4'>
          初期設定をする
        </Button>
      </Link>
    );
  }
  // ___________________________________________________________________________
  //
  if (currentUser) {
    return (
      <>
        <div className='ml-2'>
          <UserNotification currentUser={currentUser} />
        </div>
        <div className='ml-4'>
          <UserMenu currentUser={currentUser} validating={validating} handleLogout={handleLogout} />
        </div>
        <div className='ml-4'>
          <ButtonAddNew />
        </div>
      </>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <Link href={`/login?redirect_to=${encodeURIComponent(router.asPath)}`} passHref>
      <Button className='ml-4'>ログイン</Button>
    </Link>
  );
};
