"use client";
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange])
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='narsp1zu'
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <div className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600' onClick={() => open?.()}>
          <TbPhotoPlus size={50} />
          <div className='font-semibold text-lg'>
            Click to upload
          </div>
          {value && (
            <div className='absolute inset-0 w-full h-full'>
              <Image
                alt='upload'
                fill
                style={{ objectFit: 'cover' }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}