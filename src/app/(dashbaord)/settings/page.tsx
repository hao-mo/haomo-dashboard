import { redirect } from 'next/navigation';

import { AccountSettingsForm } from '@/components/user-settings-forms/account-setting-form';
import { NotificationSettingsForm } from '@/components/user-settings-forms/notification-settings-form';
import { ProfileSettingsForm } from '@/components/user-settings-forms/profile-settings-form';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).single();
  console.log('🚨 - profile', profile);

  return (
    <>
      <AccountSettingsForm
        username={profile?.username ?? user.user_metadata.username ?? ''}
        email={user.email ?? ''}
      />
      <ProfileSettingsForm />
      <NotificationSettingsForm />
    </>
  );
}
