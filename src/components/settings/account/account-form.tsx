import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { ResetEmailModalProps } from '@/components/overlays/reset-email-modal';
import { ResetPasswordModalProps } from '@/components/overlays/reset-password-modal';
import { Button } from '@/components/ui/button';
import { CheckButton } from '@/components/ui/check-button';
import { Typography } from '@/components/ui/typography';
import { useCurrentUser } from '@/hooks/current-user';
import { useToggle } from '@/hooks/toggle';
import { CurrentUser } from '@/types/current-user';
// ___________________________________________________________________________
//
const ResetEmailModal = dynamic<ResetEmailModalProps>(() =>
  import('@/components/overlays/reset-email-modal').then((mod) => mod.ResetEmailModal),
);

const ResetPasswordModal = dynamic<ResetPasswordModalProps>(() =>
  import('@/components/overlays/reset-password-modal').then((mod) => mod.ResetPasswordModal),
);
// ___________________________________________________________________________
//
export type AccountFormProps = {
  currentUser: CurrentUser;
};
// ___________________________________________________________________________
//
export const AccountForm: React.VFC<AccountFormProps> = ({ currentUser }) => {
  const [openEmail, toggleEmailModal] = useToggle();
  const [openPassword, togglePasswordModal] = useToggle();
  const { setCurrentUser, authChecking, updateCurrentUser } = useCurrentUser();

  const timeout = useRef<NodeJS.Timeout>();
  const handleUpdateNotification = async (
    values: Pick<
      CurrentUser,
      'email_notify_comments' | 'email_notify_followings' | 'email_notify_likes'
    >,
  ) => {
    setCurrentUser((prev) => ({ ...(prev as CurrentUser), ...values }));

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      await updateCurrentUser(values);
    }, 1000);
  };

  // ___________________________________________________________________________
  //
  if (authChecking || !currentUser) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <ResetEmailModal open={openEmail} onClose={toggleEmailModal} />
      <ResetPasswordModal open={openPassword} onClose={togglePasswordModal} />

      <div className='py-6 border-b border-gray-200'>
        <Typography fontSize='base' className='mb-3'>
          メール通知
        </Typography>

        <div className='grid justify-items-start gap-y-5'>
          <CheckButton
            className='text-sm text-gray-500'
            checked={currentUser.email_notify_comments}
            onClick={() =>
              handleUpdateNotification({
                email_notify_comments: !currentUser.email_notify_comments,
                email_notify_followings: currentUser.email_notify_followings,
                email_notify_likes: currentUser.email_notify_likes,
              })
            }
          >
            コメントがついたとき
          </CheckButton>

          <CheckButton
            className='text-sm text-gray-500'
            checked={currentUser.email_notify_followings}
            onClick={() =>
              handleUpdateNotification({
                email_notify_comments: currentUser.email_notify_comments,
                email_notify_followings: !currentUser.email_notify_followings,
                email_notify_likes: currentUser.email_notify_likes,
              })
            }
          >
            フォローされたとき
          </CheckButton>

          <CheckButton
            className='text-sm text-gray-500'
            checked={currentUser.email_notify_likes}
            onClick={() =>
              handleUpdateNotification({
                email_notify_comments: currentUser.email_notify_comments,
                email_notify_followings: currentUser.email_notify_followings,
                email_notify_likes: !currentUser.email_notify_likes,
              })
            }
          >
            いいねされたとき
          </CheckButton>
        </div>
      </div>

      <div className='py-6 border-b border-gray-200'>
        <Typography fontSize='base' className='mb-3'>
          メールアドレス
        </Typography>
        <div className='flex items-center'>
          <Button onClick={toggleEmailModal} color='secondary' variant='outlined' size='sm'>
            メールアドレスを変更
          </Button>
        </div>
      </div>

      <div className='py-6 border-b border-gray-200'>
        <Typography fontSize='base' className='mb-3'>
          パスワード
        </Typography>
        <Button onClick={togglePasswordModal} color='secondary' variant='outlined' size='sm'>
          パスワードを変更
        </Button>
      </div>

      <div className='py-6 border-b border-gray-200'>
        <Typography fontSize='base' className='mb-3'>
          アカウントの削除
        </Typography>
        <Link href='/settings/delete_account' passHref>
          <a className='flex items-center text-sm underline hover:no-underline hover:text-secondary-600 text-secondary-500'>
            <span className='mr-1'>退会手続きへ</span>
            <BiRightArrowAlt />
          </a>
        </Link>
      </div>
    </>
  );
};
