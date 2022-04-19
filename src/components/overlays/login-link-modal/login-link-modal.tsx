import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Typography } from '@/components/ui/typography';
// ___________________________________________________________________________
//
export type LoginLinkModalProps = {
  open: boolean;
  onClose: () => void;
};
// ___________________________________________________________________________
//
export const LoginLinkModal: React.VFC<LoginLinkModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  // ___________________________________________________________________________
  //
  return (
    <Modal open={open} onClose={onClose}>
      <Typography fontSize='base' color='textPrimary'>
        会員登録するともっと便利に使えます
      </Typography>
      <div className='mt-4 text-sm text-left text-gray-500'>
        この機能を利用するには会員登録が必要です
      </div>

      <div className='flex items-center justify-center mt-6 space-x-12'>
        <Link href={`/login?redirect_to=${encodeURIComponent(router.asPath)}`} passHref>
          <Button fullWidth variant='contained'>
            ログイン
          </Button>
        </Link>

        <Link href='/signup' passHref>
          <Button fullWidth variant='outlined'>
            会員登録
          </Button>
        </Link>
      </div>
    </Modal>
  );
};
