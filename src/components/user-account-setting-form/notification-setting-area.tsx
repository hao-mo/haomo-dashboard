'use client';

import { useFormContext } from 'react-hook-form';

import { FormCheckbox } from '@/components/form-checkbox';
import { FormRadioGroup } from '@/components/form-radio-group';
import {
  pushNotificationOptions,
  type UserAccountSettingFieldValues,
} from '@/lib/schemas/user-setting.schema';

import { UserSettingContent, UserSettingGroup, UserSettingHeader } from './user-setting';

export const NotificationSettingArea = () => {
  const form = useFormContext<UserAccountSettingFieldValues>();

  return (
    <UserSettingGroup>
      <UserSettingHeader
        title='Notifications'
        description="We'll always let you know about important changes, but you pick what else you
        want to hear about."
      />
      <UserSettingContent>
        <NotificationSettingGroup title='By Email'>
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
        </NotificationSettingGroup>
        <NotificationSettingGroup
          title='Push Notifications'
          description='These are delivered via SMS to your mobile phone.'
        >
          <FormRadioGroup
            control={form.control}
            name='push_notification'
            options={pushNotificationOptions}
          />
        </NotificationSettingGroup>
      </UserSettingContent>
    </UserSettingGroup>
  );
};

interface NotificationSettingGroupProps extends PropsWithChildren {
  title: string;
  description?: string;
}
const NotificationSettingGroup = ({
  title,
  description,
  children,
}: NotificationSettingGroupProps) => {
  return (
    <fieldset className='col-span-full'>
      <legend className='text-sm font-semibold'>{title}</legend>
      {description && <p className='mt-1 text-sm text-muted-foreground'>{description}</p>}
      <div className='mt-6 space-y-6'>{children}</div>
    </fieldset>
  );
};
