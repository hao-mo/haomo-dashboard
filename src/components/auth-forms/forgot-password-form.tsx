'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { ForgotPasswordFieldValues } from '@/lib/schemas/auth.schema';
import { forgotPasswordFormSchema } from '@/lib/schemas/auth.schema';
import { handleFormRequest } from '@/utils/auth-helpers/client';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const defaultValues: ForgotPasswordFieldValues = {
  email: 'qqharry21@gmail.com',
};

export const ForgotPasswordForm = ({ disabledButton }: { disabledButton: boolean }) => {
  const router = useRouter();
  const form = useForm<ForgotPasswordFieldValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
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
                await handleFormRequest(formData, requestPasswordUpdate, router);
              }}
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
              <div>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={disabledButton}
                >
                  {disabledButton ? '已寄出' : '寄出信件'}
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
