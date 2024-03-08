'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { NotificationSettingFieldValues } from '@/lib/schemas/user-setting.schema';
import {
  notificationSettingFormSchema,
  pushNotificationOptions,
} from '@/lib/schemas/user-setting.schema';

import { FormCheckbox } from '../form-checkbox';
import { FormRadioGroup } from '../form-radio-group';

import {
  UserSettingArea,
  UserSettingFooter,
  UserSettingGroup,
  UserSettingGroupContent,
  UserSettingGroupLabel,
  UserSettingHeader,
} from './user-setting';

const defaultValues: NotificationSettingFieldValues = {
  email_comment_notification: false,
  email_candidate_notification: false,
  email_offer_notification: false,
  push_notification: 'all',
};

export const NotificationSettingsForm = () => {
  const form = useForm<NotificationSettingFieldValues>({
    resolver: zodResolver(notificationSettingFormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  });

  function onSubmit(values: NotificationSettingFieldValues) {
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
          title='Notifications'
          description="We'll always let you know about important changes, but you pick what else you
          want to hear about."
        />
        <UserSettingArea>
          <UserSettingGroup>
            <UserSettingGroupLabel title='By Email' />
            <UserSettingGroupContent>
              <FormCheckbox
                control={form.control}
                name='email_comment_notification'
                label='Comments'
                description='Get notified when someones posts a comment on a posting.'
              />
              <FormCheckbox
                control={form.control}
                name='email_candidate_notification'
                label='Candidates'
                description='Get notified when a candidate applies for a job.'
              />
              <FormCheckbox
                control={form.control}
                name='email_offer_notification'
                label='Offers'
                description='Get notified when a candidate accepts or rejects an offer.'
              />
            </UserSettingGroupContent>
          </UserSettingGroup>
          <UserSettingGroup>
            <UserSettingGroupLabel
              title='Push Notifications'
              description='These are delivered via SMS to your mobile phone.'
            />
            <UserSettingGroupContent>
              <FormRadioGroup
                control={form.control}
                name='push_notification'
                options={pushNotificationOptions}
              />
            </UserSettingGroupContent>
          </UserSettingGroup>
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
        </UserSettingArea>
      </form>
    </Form>
  );
};
