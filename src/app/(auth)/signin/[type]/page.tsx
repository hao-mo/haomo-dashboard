import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import Logo from '@/public/logo.webp';

import { ForgotPasswordForm } from '@/components/auth-forms/forgot-password-form';
import { ResetPasswordForm } from '@/components/auth-forms/reset-password-form';
import { SignInForm } from '@/components/auth-forms/signin-form';
import { SignUpForm } from '@/components/auth-forms/signup-form';

import { getAuthTypes, getDefaultSignInView, getViewTypes } from '@/utils/auth-helpers/settings';
import { getSupabaseServerClient } from '@/utils/supabase/server';

interface PageProps {
  params: { type: string };
  searchParams: { disable_button: boolean };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const viewProps = params.type;
  const getTitle = () => {
    switch (viewProps) {
      case 'email_signin':
        return '登入';
      case 'password_signin':
        return '登入';
      case 'forgot_password':
        return '重設密碼';
      case 'reset_password':
        return '重設密碼';
      case 'signup':
        return '註冊';
      default:
        return '登入';
    }
  };
  const getDescription = () => {
    switch (viewProps) {
      case 'email_signin':
        return '使用電子郵件登入以繼續';
      case 'password_signin':
        return '使用密碼登入以繼續';
      case 'forgot_password':
        return '重設密碼以繼續';
      case 'reset_password':
        return '重設密碼以繼續';
      case 'signup':
        return '註冊新帳號以繼續';
      default:
        return '登入以繼續';
    }
  };
  const getKeywords = () => {
    switch (viewProps) {
      case 'email_signin':
        return ['登入', '電子郵件', '帳號'];
      case 'password_signin':
        return ['登入', '密碼', '帳號'];
      case 'forgot_password':
        return ['重設密碼', '忘記密碼', '帳號'];
      case 'reset_password':
        return ['重設密碼', '忘記密碼', '帳號'];
      case 'signup':
        return ['註冊', '新帳號', '帳號'];
      default:
        return ['登入', '帳號'];
    }
  };
  return {
    title: getTitle(),
    description: getDescription(),
    keywords: getKeywords(),
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.type === 'string' && viewTypes.includes(params.type)) {
    viewProp = params.type;
  } else {
    const preferredSignInView = cookies().get('preferredSignInView')?.value ?? 'password_signin';
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'reset_password') {
    return redirect('/');
  } else if (!user && viewProp === 'reset_password') {
    return redirect('/signin');
  }

  const renderTitle = () => {
    switch (viewProp) {
      case 'email_signin':
        return '登入';
      case 'password_signin':
        return '登入';
      case 'forgot_password':
        return '重設密碼';
      case 'reset_password':
        return '重設密碼';
      case 'signup':
        return '註冊';
      default:
        return '登入';
    }
  };

  const renderForm = () => {
    switch (viewProp) {
      case 'email_signin':
      case 'password_signin':
        return <SignInForm disabledButton={searchParams.disable_button} />;
      case 'forgot_password':
        return <ForgotPasswordForm disabledButton={searchParams.disable_button} />;
      case 'reset_password':
        return <ResetPasswordForm />;
      case 'signup':
        return <SignUpForm />;
      default:
        return <SignInForm disabledButton={searchParams.disable_button} />;
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='relative flex w-32 items-center overflow-hidden rounded-full'>
          <Image
            src={Logo}
            alt='Logo'
            className='h-auto w-full scale-110 object-cover object-center'
          />
        </div>
        <h2 className='mt-6 text-center text-2xl font-bold  tracking-tight text-foreground'>
          {renderTitle()}
        </h2>
      </div>
      {renderForm()}
    </>
  );
}
