'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { SignInFieldValues } from '@/lib/schemas/auth.schema';
import { signInFormSchema } from '@/lib/schemas/auth.schema';

import { handleFormRequest } from '@/utils/auth-helpers/client';
import { signInWithPassword } from '@/utils/auth-helpers/server';

import { SubmitButton } from '../submit-button';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { PasswordRules } from './password-rules';

const defaultValues: SignInFieldValues = {
  email: process.env.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_USER_EMAIL,
  password: process.env.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_USER_PASSWORD,
};

export const SignInForm = ({ disabledButton }: { disabledButton: boolean }) => {
  const router = useRouter();
  const form = useForm<SignInFieldValues>({
    resolver: zodResolver(signInFormSchema),
    mode: 'all',
    defaultValues,
  });

  const action: () => void = form.handleSubmit(async (value) => {
    const formData = new FormData();
    formData.append('email', value.email);
    formData.append('password', value.password);
    await handleFormRequest(formData, signInWithPassword, router);
  });

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
      <Card className='px-6 py-12 sm:px-12'>
        <CardContent className='p-0'>
          <Form {...form}>
            <form
              className='space-y-8'
              action={action}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>信箱地址</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='xxx@gmail.com'
                        autoCapitalize='none'
                        autoComplete='email'
                        autoCorrect='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className='flex'
                      endElement={
                        <Link
                          href='/signin/forgot_password'
                          className='ml-auto text-xs font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/90'
                        >
                          忘記密碼 ?
                        </Link>
                      }
                    >
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
              <div>
                <SubmitButton
                  type='submit'
                  className='w-full'
                  disabled={disabledButton || form.formState.isSubmitting}
                  isSubmitting={form.formState.isSubmitting}
                >
                  登入
                </SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <p className='mt-10 text-center text-sm text-foreground'>
        還沒有帳號嗎？
        <Link
          href='/signin/signup'
          className='ml-2 font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/90'
        >
          註冊
        </Link>
      </p>
    </div>
  );
};
