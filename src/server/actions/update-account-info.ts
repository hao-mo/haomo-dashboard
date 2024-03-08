'use server';

import { revalidatePath } from 'next/cache';

import { withAuth } from '@/utils/action-utils';
import { getSupabaseServerClient } from '@/utils/supabase/server';

export const updateAccountInfo = withAuth(async (formData: FormData) => {
  try {
    const id = String(formData.get('id')).trim();
    const username = String(formData.get('username')).trim();

    const client = getSupabaseServerClient();

    const { error: updateError } = await client
      .from('profiles')
      .update({ username })
      .eq('id', id)
      .select();

    if (updateError) {
      console.log(`Account update failed: ${updateError.message}`);
      throw new Error(`更新失敗`);
    }

    console.log(`Account updated: ${id}`);

    revalidatePath('/account/preferences');

    return { success: true, data: `更新成功` };
  } catch (error: any) {
    return { success: false, data: error.message as string };
  }
});
