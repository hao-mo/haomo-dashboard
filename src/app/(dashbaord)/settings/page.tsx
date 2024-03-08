import { redirect } from 'next/navigation';

import { AccountSettingsForm } from '@/components/user-settings-forms/account-setting-form';
import { NotificationSettingsForm } from '@/components/user-settings-forms/notification-settings-form';
import { ProfileSettingsForm } from '@/components/user-settings-forms/profile-settings-form';

import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).single();

  return (
    <>
      <AccountSettingsForm
        userId={user.id}
        username={profile?.username ?? 'User'}
        email={user.email ?? ''}
      />
      <ProfileSettingsForm />
      <NotificationSettingsForm />
    </>
  );
}
