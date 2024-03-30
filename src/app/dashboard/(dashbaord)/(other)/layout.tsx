import { redirectToPath } from '@/utils/auth-helpers/server';
import { getSupabaseServerClient } from '@/utils/supabase/server';

import { DashboardHeader } from './_components/dashboard-header';
import { DashboardSidebar } from './_components/dashboard-sidebar';

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToPath('/signin');
  }

  return (
    <div className='relative flex h-screen min-h-full w-full overflow-hidden'>
      <DashboardSidebar />
      <div className='flex-1'>
        <DashboardHeader />
        <main className='h-[calc(100vh-4rem)] flex-1 overflow-y-auto overflow-x-hidden'>
          {children}
        </main>
      </div>
    </div>
  );
}
