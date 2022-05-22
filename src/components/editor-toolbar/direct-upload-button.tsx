import { Blob, DirectUpload } from '@rails/activestorage';
import imageCompression from 'browser-image-compression';
import React from 'react';
import { BiImage } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { API_URL, MAXIMUM_UPLOAD_IMAGES } from '@/lib/constants';
// ___________________________________________________________________________
//
export type DirectUploadButtonProps = {
  afterUpload?: (urls: string[]) => void;
};
// ___________________________________________________________________________
//
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1400,
  useWebWorker: true,
  initialQuality: 0.8,
};
// ___________________________________________________________________________
//
export const DirectUploadButton: React.VFC<DirectUploadButtonProps> = ({ afterUpload }) => {
  const uploadImage = (file: File) => {
    const url = `${API_URL}/direct_uploads`;
    const directUpload = new DirectUpload(file, url);

    return new Promise((resolve, reject) => {
      directUpload.create((err, blob) => {
        err ? reject(err) : resolve(blob);
      });
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = toast.loading('アップロード中');

    try {
      const files = e.target.files;
      const urls = [];

      if (!files) {
        return;
      }

      if (files.length > MAXIMUM_UPLOAD_IMAGES) {
        // validation
        throw new Error(`画像は同時に${MAXIMUM_UPLOAD_IMAGES}枚までアップロードできます`);
      }

      for (let i = 0; i < files.length; i++) {
        // upload files
        const compressedFile = await imageCompression(files[i], options);
        const { signed_id, key } = (await uploadImage(compressedFile)) as Blob & { key: string };
        const url = `${API_URL}/rails/active_storage/blobs/proxy/${signed_id}/${key}`;

        urls.push(url);
      }

      if (afterUpload) {
        // call hook
        afterUpload(urls);
      }

      toast.update(id, {
        render: 'アップロードしました',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(id, {
        render: 'アップロードできませんでした',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      e.target.value = '';
    }
  };
  // ___________________________________________________________________________
  //
  return (
    <button className='inline-flex items-center justify-center p-1 text-gray-500 rounded-full h-9 w-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400'>
      <label className='flex items-center justify-center cursor-pointer'>
        <BiImage className='text-xl' />
        <input
          className='hidden'
          type='file'
          accept='image/png, image/jpeg, image/gif'
          multiple
          onChange={handleUpload}
        />
      </label>
    </button>
  );
};
