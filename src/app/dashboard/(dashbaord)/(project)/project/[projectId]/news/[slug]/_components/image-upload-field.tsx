import Image from 'next/image';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { ContentWithId } from '@/lib/types';

import { cn } from '@/utils';

interface ImageUploadFieldProps {
  form: UseFormReturn<ContentWithId>;
}

export const ImageUploadField = ({ form }: ImageUploadFieldProps) => {
  const fileRef = form.register('file');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      name='file'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <div className='group relative mb-2 overflow-hidden'>
            <div
              className={cn(
                'flex h-80 items-center justify-center rounded-md border-2 border-dashed border-border bg-muted',
                field.value &&
                  'absolute left-0 top-0 z-1 size-full border-none bg-transparent text-white opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
              )}
            >
              <button
                type='button'
                className='size-full cursor-pointer text-sm'
                onClick={() => inputRef.current?.click()}
              >
                {field.value ? '變更圖片' : '請選擇圖片'}
              </button>
            </div>
            {field.value && (
              <div className='relative h-80 w-full bg-muted'>
                <Image
                  src={URL.createObjectURL(field.value)}
                  alt={field.value.name}
                  className='size-full object-contain object-center blur-sm transition-all duration-500 ease-in-out group-hover:brightness-50'
                  loading='lazy'
                  onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                  fill
                />
              </div>
            )}{' '}
          </div>
          <FormControl>
            <Input
              type='file'
              className='hidden'
              {...fileRef}
              ref={inputRef}
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  field.onChange(event.target.files[0]);
                }
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
