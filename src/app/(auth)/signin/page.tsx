import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getDefaultSignInView } from '@/utils/auth-helpers/settings';

export const metadata: Metadata = {
  title: '登入',
  description: '登入以繼續',
  keywords: ['登入', '電子郵件', '帳號'],
};

export default function Page() {
  const preferredSignInView = cookies().get('preferredSignInView')?.value;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}
