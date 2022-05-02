import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { ResetEmailModalProps } from '@/components/overlays/reset-email-modal';
import { ResetPasswordModalProps } from '@/components/overlays/reset-password-modal';
import { Button } from '@/components/ui/button';
import { CheckButton } from '@/components/ui/check-button';
import { Typography } from '@/components/ui/typography';
import { useToggle } from '@/hooks/toggle';
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
export const Account: React.VFC = () => {
  const [openEmail, toggleEmailModal] = useToggle();
  const [openPassword, togglePasswordModal] = useToggle();

  const [notifications, setNotifications] = useState({
    comment: false,
    like: false,
  });

  const toggleNotification = (key: 'comment' | 'like') => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <ResetEmailModal open={openEmail} onClose={toggleEmailModal} />
      <ResetPasswordModal open={openPassword} onClose={togglePasswordModal} />

      <div className='py-6 border-b border-gray-200'>
        <Typography fontSize='base' className='mb-3'>
          メール通知<span className='ml-1 text-yellow-500'>WIP</span>
        </Typography>

        <div className='grid justify-items-start gap-y-5'>
          <CheckButton
            className='text-sm text-gray-500'
            checked={notifications['comment']}
            onClick={() => toggleNotification('comment')}
          >
            コメントがついたとき
          </CheckButton>

          <CheckButton
            className='text-sm text-gray-500'
            checked={notifications['like']}
            onClick={() => toggleNotification('like')}
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
