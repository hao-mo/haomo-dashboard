'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { SignUpFieldValues } from '@/lib/schemas/auth.schema';
import { signUpFormSchema } from '@/lib/schemas/auth.schema';
import { handleFormRequest } from '@/utils/auth-helpers/client';
import { signUp } from '@/utils/auth-helpers/server';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { PasswordRules } from './password-rules';

const defaultValues: SignUpFieldValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFieldValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'all',
    defaultValues,
  });

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
      <Card className='px-6 py-12 sm:px-12'>
        <CardContent className='p-0'>
          <Form {...form}>
            <form
              className='space-y-8'
              action={async (formData) => {
                await handleFormRequest(formData, signUp, router);
              }}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>註冊信箱</FormLabel>
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
              {/* <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Checkbox
                    id='remember-me'
                    name='remember-me'
                  />
                  <Label
                    htmlFor='remember-me'
                    className='ml-3 block text-xs font-normal text-foreground'
                  >
                    記住我
                  </Label>
                </div>

                <Link
                  href='/signin/forgot_password'
                  className='text-xs font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/90'
                >
                  忘記密碼 ?
                </Link>
              </div> */}
              <div>
                <Button
                  type='submit'
                  className='w-full'
                >
                  登入
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};