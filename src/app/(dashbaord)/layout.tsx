import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { redirectToPath } from '@/utils/auth-helpers/server';
import { createClient } from '@/utils/supabase/server';

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToPath('/signin');
  }

  return (
    <div className='relative flex h-screen min-h-full w-full overflow-hidden'>
      <Sidebar user={user} />
      <div className='relative flex max-h-screen flex-1 flex-col overflow-hidden border-l border-border'>
        <Header />
        <main className='flex-1 overflow-y-auto overflow-x-hidden py-10'>{children}</main>
      </div>
    </div>
  );
}
