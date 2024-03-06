'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import type { SignInFieldValues } from '@/lib/schemas/signin.schema';
import { signInFormSchema } from '@/lib/schemas/signin.schema';
import { signUp } from '@/utils/auth-helpers/server';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const defaultValues: SignInFieldValues = {
  email: '',
  password: '',
};

export const SignUpForm = () => {
  const form = useForm<SignInFieldValues>({
    resolver: zodResolver(signInFormSchema),
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
              action={signUp}
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
                      <Popover>
                        <PopoverTrigger>
                          <InfoIcon size={16} />
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-fit p-4'
                          side='right'
                          align='start'
                          alignOffset={1}
                        >
                          <p>密碼規則</p>
                          <ul className='mt-2 list-inside list-disc space-y-1'>
                            <li>至少 8 個字元</li>
                            <li>至少包含一個大寫字母</li>
                            <li>至少包含一個小寫字母</li>
                            <li>至少包含一個數字</li>
                            <li>至少包含一個特殊符號</li>
                          </ul>
                        </PopoverContent>
                      </Popover>
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

              <div className='flex items-center justify-between'>
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
              </div>

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

      {/* <p className='mt-10 text-center text-sm text-foreground'>
        還沒有帳號嗎 ?
        <a
          href='#'
          className='ml-2 font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/90'
        >
          Sign up
        </a>
      </p> */}
    </div>
  );
};
