'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { updateAccountInfo } from '@/server/actions/update-account-info';

import type { AccountSettingFieldValues } from '@/lib/schemas/user-setting.schema';
import { accountSettingFormSchema } from '@/lib/schemas/user-setting.schema';

import { SubmitButton } from '../submit-button';
import { toast } from '../ui/use-toast';

import {
  UserSettingArea,
  UserSettingFooter,
  UserSettingFormContent,
  UserSettingFormItem,
  UserSettingFormLabel,
  UserSettingHeader,
} from './user-setting';

export const AccountSettingsForm = ({
  userId,
  username,
  email,
}: {
  userId: string;
  username: string;
  email: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountSettingFieldValues>({
    resolver: zodResolver(accountSettingFormSchema),
    mode: 'all',
    defaultValues: {
      username,
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updateUsername = String(formData.get('username')).trim();

    startTransition(async () => {
      const res = await updateAccountInfo(formData);
      if (res?.success) {
        toast({
          title: '更新成功',
          description: res.data,
        });
      } else {
        toast({
          title: '更新失敗',
        });
      }
    });
    form.reset({ username: updateUsername }, { keepDirty: false });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        id='profile-setting-form'
      >
        <UserSettingHeader title='Account Information' />
        <UserSettingArea>
          <input
            type='hidden'
            name='id'
            value={userId}
          />
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
          <UserSettingFormItem>
            <UserSettingFormLabel>Email</UserSettingFormLabel>
            <UserSettingFormContent>
              <Input
                type='email'
                value={email}
                readOnly
                disabled
              />
            </UserSettingFormContent>
          </UserSettingFormItem>
          <UserSettingFooter>
            <Button
              variant='outline'
              size='sm'
              type='reset'
              onClick={() => form.reset()}
              disabled={!form.formState.isDirty || isPending}
            >
              取消
            </Button>
            <SubmitButton
              size='sm'
              disabled={!form.formState.isDirty || isPending}
              isPending={isPending}
            >
              更新
            </SubmitButton>
          </UserSettingFooter>
        </UserSettingArea>
      </form>
    </Form>
  );
};
