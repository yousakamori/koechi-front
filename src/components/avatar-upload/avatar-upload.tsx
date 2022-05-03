import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { currentUserApi } from '@/api/current-user';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HttpError } from '@/error/http-error';
import { useCurrentUser } from '@/hooks/current-user';
// ___________________________________________________________________________
//
export const AvatarUpload: React.VFC = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [validating, setValidating] = useState(false);
  const { setCurrentUser, currentUser } = useCurrentUser();

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files.length) {
      return;
    }

    setValidating(true);
    const id = toast.loading('アップロード中');
    const formData = new FormData();
    formData.append('avatar', files[0]);

    try {
      const currentUser = await currentUserApi.updateAvatar(formData);
      setCurrentUser((prev) =>
        prev ? { ...prev, avatar_url: currentUser.avatar_url } : currentUser,
      );
      toast.update(id, {
        render: 'アップロードしました',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      if (err instanceof HttpError) {
        toast.update(id, {
          render: err.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
      throw err;
    } finally {
      setValidating(false);
    }
  };
  // ___________________________________________________________________________
  //
  if (!currentUser) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <label className='inline-block cursor-pointer'>
        <input
          ref={fileRef}
          className='hidden'
          type='file'
          accept='image/png, image/jpeg, image/gif'
          multiple
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div className='w-24 h-24 mx-auto rounded-full shadow-md'>
          <Avatar src={currentUser.avatar_url} size='xl' />
        </div>
        <Button
          loading={validating}
          className='mt-1.5'
          color='secondary'
          variant='ghost'
          size='sm'
          onClick={() => fileRef.current?.click()}
        >
          写真を変更
        </Button>
      </label>
    </>
  );
};
