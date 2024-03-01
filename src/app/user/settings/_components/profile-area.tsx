'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import AvatarFallbackImage from '@/public/avatar.webp';

import { DragDropInputArea } from '@/components/drag-drop-input-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { UserAccountSettingFieldValues } from '../_lib';

import { UserSetting, UserSettingContent, UserSettingHeader } from './user-setting';

export const ProfileArea = ({ form }: { form: UseFormReturn<UserAccountSettingFieldValues> }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = form.register('avatar');

  return (
    <UserSetting>
      <UserSettingHeader
        title='Profile'
        description='This information will be displayed publicly so be careful what you share.'
      />
      <UserSettingContent>
        <FormField
          control={form.control}
          name='avatar'
          render={({ field }) => (
            <FormItem className='col-span-full flex items-center gap-x-8'>
              <Avatar className='size-20'>
                <AvatarImage
                  className='h-auto w-full rounded-lg bg-muted-foreground object-cover object-center blur-sm transition-all duration-500 ease-in-out'
                  src={field.value ? URL.createObjectURL(field.value) : AvatarFallbackImage.src}
                  loading='lazy'
                  alt='avatar'
                  onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                />
                <AvatarFallback asChild>
                  <Image
                    className='h-auto w-full rounded-lg bg-muted-foreground object-cover object-center'
                    src={AvatarFallbackImage}
                    alt='avatar'
                    loading='lazy'
                  />
                </AvatarFallback>
              </Avatar>
              <div className='space-y-2'>
                <FormControl>
                  <Input
                    type='file'
                    className='hidden'
                    {...fileRef}
                    ref={inputRef}
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0)
                        field.onChange(event.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => inputRef.current?.click()}
                >
                  Change avatar
                </Button>
                <FormDescription>JPG, GIF or PNG. 3MB max.</FormDescription>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem className='sm:col-span-4'>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  startDecorator={
                    <span className='inline-flex select-none items-center text-muted-foreground sm:text-sm'>
                      http://
                    </span>
                  }
                  placeholder='www.example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='about'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>Write a few sentences about yourself.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cover_image'
          render={({ field: { value, ...field } }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <DragDropInputArea
                  previewImage={value}
                  {...field}
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0)
                      field.onChange(event.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </UserSettingContent>
    </UserSetting>
  );
};
