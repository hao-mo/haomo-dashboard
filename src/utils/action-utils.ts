'use server';

import { redirectToPath } from './auth-helpers/server';
import { getSupabaseServerClient } from './supabase/server';

export const withAuth =
  <T extends any[], R>(func: (...args: T) => Promise<R>) =>
  async (...args: T) => {
    try {
      const supabase = getSupabaseServerClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('登入狀態已改變，請重新登入');
      }

      return await func(...args);
    } catch (error) {
      return redirectToPath('/signin');
    }
  };
