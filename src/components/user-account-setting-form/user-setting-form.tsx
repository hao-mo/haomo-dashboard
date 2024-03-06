'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { searchCountry } from '@/lib/countries';
import type { UserAccountSettingFieldValues } from '@/lib/schemas/user-setting.schema';
import { userSettingFormSchema } from '@/lib/schemas/user-setting.schema';

import { NotificationSettingArea } from './notification-setting-area';
import { PersonalInfoSettingArea } from './personal-info-setting-area';
import { ProfileSettingArea } from './profile-setting-area';
import { SettingFooter } from './setting-footer';

const defaultValues: UserAccountSettingFieldValues = {
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
  country: searchCountry({ alpha2: 'TW' })?.value ?? '',
};

export function UserAccountSettingForm() {
  const form = useForm<UserAccountSettingFieldValues>({
    resolver: zodResolver(userSettingFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: UserAccountSettingFieldValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
