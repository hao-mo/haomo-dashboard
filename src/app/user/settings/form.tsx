'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, UserCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { ProfileArea } from './_components/profile-area';
import type { UserAccountSettingFieldValues } from './_lib';
import { formSchema } from './_lib';

export function UserAccountSettingForm() {
  // 1. Define your form.
  const form = useForm<UserAccountSettingFieldValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      website: '',
      about: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: UserAccountSettingFieldValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  console.log('🚨 - form', form.getValues());
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='space-y-12'>
          <ProfileArea form={form} />
        </div>

        {/* Footer */}
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-gray-900 text-sm font-semibold leading-6'
          >
            Cancel
          </button>

          <Button type='submit'>Submit</Button>
        </div>
      </form>
      <form>
        <div className='space-y-12'>
          <div className='border-gray-900/10 grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-12 md:grid-cols-3'>
            <div>
              <h2 className='text-gray-900 text-base font-semibold leading-7'>Profile</h2>
              <p className='text-gray-600 mt-1 text-sm leading-6'>
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='website'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Website
                </label>
                <div className='mt-2'>
                  <div className='ring-gray-300 focus-within:ring-indigo-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md'>
                    <span className='text-gray-500 flex select-none items-center pl-3 sm:text-sm'>
                      http://
                    </span>
                    <input
                      type='text'
                      name='website'
                      id='website'
                      className='text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='www.example.com'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='about'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  About
                </label>
                <div className='mt-2'>
                  <textarea
                    id='about'
                    name='about'
                    rows={3}
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                </div>
                <p className='text-gray-600 mt-3 text-sm leading-6'>
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='photo'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <UserCircleIcon
                    className='text-gray-300 size-12'
                    aria-hidden='true'
                  />
                  <button
                    type='button'
                    className='text-gray-900 ring-gray-300 hover:bg-gray-50 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset'
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='cover-photo'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Cover photo
                </label>
                <div className='border-gray-900/25 mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10'>
                  <div className='text-center'>
                    <ImageIcon
                      className='text-gray-300 mx-auto size-12'
                      aria-hidden='true'
                    />
                    <div className='text-gray-600 mt-4 flex text-sm leading-6'>
                      <label
                        htmlFor='file-upload'
                        className='text-indigo-600 focus-within:ring-indigo-600 hover:text-indigo-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-gray-600 text-xs leading-5'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-gray-900/10 grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-12 md:grid-cols-3'>
            <div>
              <h2 className='text-gray-900 text-base font-semibold leading-7'>
                Personal Information
              </h2>
              <p className='text-gray-600 mt-1 text-sm leading-6'>
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  First name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Last name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    autoComplete='family-name'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    name='country'
                    autoComplete='country-name'
                    className='text-gray-900 ring-gray-300 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='street-address'
                    id='street-address'
                    autoComplete='street-address'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='address-level2'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='region'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='region'
                    id='region'
                    autoComplete='address-level1'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='text-gray-900 block text-sm font-medium leading-6'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='postal-code'
                    id='postal-code'
                    autoComplete='postal-code'
                    className='text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='border-gray-900/10 grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-12 md:grid-cols-3'>
            <div>
              <h2 className='text-gray-900 text-base font-semibold leading-7'>Notifications</h2>
              <p className='text-gray-600 mt-1 text-sm leading-6'>
                We&apos;ll always let you know about important changes, but you pick what else you
                want to hear about.
              </p>
            </div>

            <div className='max-w-2xl space-y-10 md:col-span-2'>
              <fieldset>
                <legend className='text-gray-900 text-sm font-semibold leading-6'>By Email</legend>
                <div className='mt-6 space-y-6'>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='comments'
                        name='comments'
                        type='checkbox'
                        className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4 rounded'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='comments'
                        className='text-gray-900 font-medium'
                      >
                        Comments
                      </label>
                      <p className='text-gray-500'>
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='candidates'
                        name='candidates'
                        type='checkbox'
                        className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4 rounded'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='candidates'
                        className='text-gray-900 font-medium'
                      >
                        Candidates
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='offers'
                        name='offers'
                        type='checkbox'
                        className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4 rounded'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='offers'
                        className='text-gray-900 font-medium'
                      >
                        Offers
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className='text-gray-900 text-sm font-semibold leading-6'>
                  Push Notifications
                </legend>
                <p className='text-gray-600 mt-1 text-sm leading-6'>
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4'
                    />
                    <label
                      htmlFor='push-everything'
                      className='text-gray-900 block text-sm font-medium leading-6'
                    >
                      Everything
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-email'
                      name='push-notifications'
                      type='radio'
                      className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4'
                    />
                    <label
                      htmlFor='push-email'
                      className='text-gray-900 block text-sm font-medium leading-6'
                    >
                      Same as email
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-nothing'
                      name='push-notifications'
                      type='radio'
                      className='border-gray-300 text-indigo-600 focus:ring-indigo-600 size-4'
                    />
                    <label
                      htmlFor='push-nothing'
                      className='text-gray-900 block text-sm font-medium leading-6'
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
