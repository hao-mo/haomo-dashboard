import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/utils';

interface ImageUploadFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends WithClassName {
  name: TName;
  control: Control<TFieldValues>;
  defaultImageUrl: string;
  defaultAlt: string;
  disabled?: boolean;
}

export const ImageUploadField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  defaultImageUrl,
  defaultAlt,
  disabled,
  className,
}: ImageUploadFieldProps<TFieldValues, TName>) => {
  const { register } = useFormContext();
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);

  const fileRef = register(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const isImageExist = imageUrl && imageUrl !== '';

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <div className='group relative mb-2 overflow-hidden'>
              <div
                className={cn(
                  'flex h-80 items-center justify-center rounded-md border-2 border-dashed border-border bg-muted',
                  isImageExist &&
                    'absolute left-0 top-0 z-1 size-full border-none bg-transparent text-white opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
                )}
              >
                {!disabled && (
                  <button
                    type='button'
                    className='size-full cursor-pointer text-sm'
                    onClick={() => inputRef.current?.click()}
                  >
                    {isImageExist ? '變更圖片' : '請選擇圖片'}
                  </button>
                )}
              </div>
              {isImageExist && (
                <div className='relative h-80 w-full rounded-md bg-muted'>
                  <Image
                    src={imageUrl}
                    alt={field.value ? field.value.name : defaultAlt}
                    className={cn(
                      'size-full object-contain object-center blur-sm transition-all duration-500 ease-in-out group-hover:brightness-50',
                      disabled && 'opacity-50 brightness-50'
                    )}
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
                accept='.jpg, .jpeg, .png, .webp'
                {...fileRef}
                ref={inputRef}
                disabled={disabled}
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    const file = event.target.files[0];
                    field.onChange(file);
                    const url = URL.createObjectURL(file);
                    setImageUrl(url);
                    return () => {
                      URL.revokeObjectURL(url);
                    };
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
