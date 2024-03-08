'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { AccountSettingFieldValues } from '@/lib/schemas/user-setting.schema';
import { accountSettingFormSchema } from '@/lib/schemas/user-setting.schema';

import {
  UserSettingArea,
  UserSettingFooter,
  UserSettingFormContent,
  UserSettingFormItem,
  UserSettingFormLabel,
  UserSettingHeader,
} from './user-setting';

export const AccountSettingsForm = ({ username, email }: AccountSettingFieldValues) => {
  const form = useForm<AccountSettingFieldValues>({
    resolver: zodResolver(accountSettingFormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      username,
      email,
    },
  });

  function onSubmit(values: AccountSettingFieldValues) {
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
        <UserSettingHeader title='Account Information' />
        <UserSettingArea>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Username</UserSettingFormLabel>
                <UserSettingFormContent>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </UserSettingFormContent>
              </UserSettingFormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <UserSettingFormItem>
                <UserSettingFormLabel>Email</UserSettingFormLabel>
                <UserSettingFormContent>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                    />
                  </FormControl>
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
        </UserSettingArea>
      </form>
    </Form>
  );
};
