import { redirect } from 'next/navigation';

import { UserAccountSettingForm } from '@/components/user-account-setting-form';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('🚨 - user', user);

  const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id).single();
  console.log('🚨 - profile', profile);

  if (!user) {
    return redirect('/signin');
  }

  return <UserAccountSettingForm />;
}
