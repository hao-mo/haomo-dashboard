import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import Logo from '@/public/logo.webp';

import { SignInForm } from '@/components/auth-forms/signin-form';
import { SignUpForm } from '@/components/auth-forms/signup-form';
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/auth-helpers/settings';
import { createClient } from '@/utils/supabase/server';

export default async function Page({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('🚨 - user', user);

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
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
      case 'update_password':
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
        return <SignInForm />;
      case 'forgot_password':
      case 'update_password':
      case 'signup':
        return <SignUpForm />;
      default:
        return <SignInForm />;
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
