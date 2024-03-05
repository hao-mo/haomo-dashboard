'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { searchCountry } from '@/lib/countries';

import { NotificationSettingArea } from './_components/notification-setting-area';
import { PersonalInfoSettingArea } from './_components/personal-info-setting-area';
import { ProfileSettingArea } from './_components/profile-setting-area';
import { SettingFooter } from './_components/setting-footer';
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
      email: '',
      address: '',
      avatar: undefined,
      cover_image: undefined,
      email_comment_notification: false,
      email_candidate_notification: false,
      email_offer_notification: false,
      push_notification: 'all',
      country: searchCountry({ alpha2: 'TW' })?.value,
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
          <ProfileSettingArea />
          <PersonalInfoSettingArea />
          <NotificationSettingArea />
        </div>
        <SettingFooter />
      </form>
    </Form>
  );
}
