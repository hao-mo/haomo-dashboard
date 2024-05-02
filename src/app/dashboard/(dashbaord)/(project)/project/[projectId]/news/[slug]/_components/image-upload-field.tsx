import Image from 'next/image';
import { useRef, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { ContentWithId } from '@/lib/types';

import { cn } from '@/utils';

interface ImageUploadFieldProps {
  form: UseFormReturn<ContentWithId>;
}

export const ImageUploadField = ({ form }: ImageUploadFieldProps) => {
  const { control, setValue, register, watch } = form;

  const defaultImageUrl = watch('imageUrl');
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);

  const imageDescription = watch('formattedAlt');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue('file', file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <FormField
      name='file'
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <div className='group relative mb-2 overflow-hidden'>
              <div
                className={cn(
                  'flex h-80 items-center justify-center rounded-md border-2 border-dashed border-border bg-muted',
                  imageUrl !== '' &&
                    'absolute left-0 top-0 z-1 size-full border-none bg-transparent text-white opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
                )}
              >
                <button
                  type='button'
                  className='size-full cursor-pointer text-sm'
                  onClick={() => inputRef.current?.click()}
                >
                  {imageUrl !== '' ? '變更圖片' : '請選擇圖片'}
                </button>
              </div>
              {imageUrl !== '' && (
                <div className='relative h-80 w-full bg-muted'>
                  <Image
                    src={imageUrl}
                    alt={field.value ? field.value.name : imageDescription}
                    className='size-full object-contain object-center blur-sm transition-all duration-500 ease-in-out group-hover:brightness-50'
                    fill
                    loading='lazy'
                    onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                  />
                </div>
              )}
            </div>
            <FormControl>
              <Input
                type='file'
                className='hidden'
                {...register('file')}
                ref={inputRef}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
