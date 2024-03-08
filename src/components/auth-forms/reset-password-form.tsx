'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { ResetPasswordFieldValues } from '@/lib/schemas/auth.schema';
import { resetPasswordFormSchema } from '@/lib/schemas/auth.schema';
import { handleFormRequest } from '@/utils/auth-helpers/client';
import { resetPassword } from '@/utils/auth-helpers/server';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { PasswordRules } from './password-rules';

const defaultValues: ResetPasswordFieldValues = {
  password: '',
  confirmPassword: '',
};

export const ResetPasswordForm = () => {
  const router = useRouter();
  const form = useForm<ResetPasswordFieldValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'all',
    defaultValues,
  });

  // Can use useTransition to add pending state

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
      <Card className='px-6 py-12 sm:px-12'>
        <CardContent className='p-0'>
          <Form {...form}>
            <form
              className='space-y-8'
              action={async (formData) => {
                await handleFormRequest(formData, resetPassword, router);
              }}
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      密碼
                      <PasswordRules />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='請輸入密碼'
                        autoComplete='current-password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>確認密碼</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='請再次輸入密碼'
                        autoComplete='current-password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type='submit'
                  className='w-full'
                >
                  重設密碼
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className='mt-10 text-center text-sm text-foreground'>
        已經有帳號了嗎？
        <Link
          href='/signin'
          className='ml-2 font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/90'
        >
          登入
        </Link>
      </p>
    </div>
  );
};
