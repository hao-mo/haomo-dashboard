'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import AvatarFallbackImage from '@/public/avatar.webp';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import type { ProfileSettingFieldValues } from '@/lib/schemas/user-setting.schema';
import { profileSettingFormSchema } from '@/lib/schemas/user-setting.schema';

import {
  UserSettingArea,
  UserSettingFooter,
  UserSettingFormContent,
  UserSettingFormItem,
  UserSettingFormLabel,
  UserSettingHeader,
} from './user-setting';

const defaultValues: ProfileSettingFieldValues = {
  avatar_url: undefined,
  website: '',
  bio: '',
  full_name: '',
};

export const ProfileSettingsForm = () => {
  const form = useForm<ProfileSettingFieldValues>({
    resolver: zodResolver(profileSettingFormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = form.register('avatar_url');

  function onSubmit(values: ProfileSettingFieldValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id='profile-setting-form'
      >
        <UserSettingHeader
          title='Profile'
          description='This information will be displayed publicly so be careful what you share.'
        />
        <UserSettingArea>
          <FormField
            control={form.control}
            name='avatar_url'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Avatar</UserSettingFormLabel>
                <UserSettingFormContent>
                  <div className='flex items-center gap-x-8'>
                    <Avatar className='size-20'>
                      <AvatarImage
                        className='h-auto w-full rounded-lg bg-muted-foreground object-cover object-center blur-sm transition-all duration-500 ease-in-out'
                        src={
                          field.value ? URL.createObjectURL(field.value) : AvatarFallbackImage.src
                        }
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
                  </div>
                  <FormMessage />
                </UserSettingFormContent>
              </UserSettingFormItem>
            )}
          />
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Website</UserSettingFormLabel>
                <UserSettingFormContent>
                  <FormControl>
                    <Input
                      startDecorator={
                        <span className='inline-flex select-none items-center text-xs text-muted-foreground'>
                          http://
                        </span>
                      }
                      placeholder='www.example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </UserSettingFormContent>
              </UserSettingFormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Bio</UserSettingFormLabel>
                <UserSettingFormContent>
                  <FormControl>
                    <Textarea
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Write a few sentences about yourself.</FormDescription>
                  <FormMessage />
                </UserSettingFormContent>
              </UserSettingFormItem>
            )}
          />
          <UserSettingFooter>
            <Button
              variant='outline'
              size='sm'
              type='reset'
              onClick={() => form.reset()}
              disabled={!form.formState.isDirty}
            >
              取消
            </Button>
            <Button
              size='sm'
              type='submit'
              disabled={!form.formState.isDirty}
            >
              更新
            </Button>
          </UserSettingFooter>
          {/* <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Website</UserSettingFormLabel>
                <UserSettingFormContent>
                  <Combobox
                    options={countries}
                    name={field.name}
                    value={field.value}
                  />
                  <FormMessage />
                </UserSettingFormContent>
              </UserSettingFormItem>
            )}
          /> */}
          {/* <FormField
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
            /> */}
        </UserSettingArea>
      </form>
    </Form>
  );
};
