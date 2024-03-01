'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { searchCountry } from '@/lib/countries';

import { PersonalInfoArea } from './_components/personal-info-area';
import { ProfileArea } from './_components/profile-area';
import type { UserAccountSettingFieldValues } from './_lib';
import { formSchema } from './_lib';

export function UserAccountSettingForm() {
  // 1. Define your form.
  const form = useForm<UserAccountSettingFieldValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      website: '',
      about: '',
      country: searchCountry({ alpha2: 'TW' })?.value,
      address: '',
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
          <PersonalInfoArea form={form} />
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
