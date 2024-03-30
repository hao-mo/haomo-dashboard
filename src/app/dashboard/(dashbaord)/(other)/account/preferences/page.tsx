import { redirect } from 'next/navigation';

import { getSupabaseServerClient } from '@/utils/supabase/server';

import { SettingThemePreferences } from './_components/setting-theme-preferences';

import { AccountSettingsForm } from '@/app/dashboard/(dashbaord)/(other)/account/preferences/_components/account-setting-form';
import { NotificationSettingsForm } from '@/app/dashboard/(dashbaord)/(other)/account/preferences/_components/notification-settings-form';
import { ProfileSettingsForm } from '@/app/dashboard/(dashbaord)/(other)/account/preferences/_components/profile-settings-form';

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
        username={profile?.username ?? user.user_metadata.username ?? ''}
        email={user.email ?? ''}
      />
      <ProfileSettingsForm />
      <SettingThemePreferences />
      <NotificationSettingsForm />
    </>
  );
}
