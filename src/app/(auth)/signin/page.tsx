import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getDefaultSignInView } from '@/utils/auth-helpers/settings';

export default function Page() {
  const preferredSignInView = cookies().get('preferredSignInView')?.value;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}
