import { ProjectModal } from '@/components/modals/project-modal';

import prismadb from '@/lib/prismadb';

import { redirectToPath } from '@/utils/auth-helpers/server';
import { getSupabaseServerClient } from '@/utils/supabase/server';

import { ProjectHeader } from './_components/project-header';
import { ProjectSidebar } from './_components/project-sidebar';

export const revalidate = 0;

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToPath('/signin');
  }

  const project = await prismadb.projects.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!project) {
    return redirectToPath(`/`);
  }

  const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).single();

  return (
    <div className='relative flex h-screen min-h-screen w-full flex-col overflow-hidden'>
      <ProjectHeader userId={user.id} />
      <div className='flex h-[calc(100vh-4rem)] flex-1'>
        <ProjectSidebar
          username={profile?.username ?? user.user_metadata.username}
          email={user.email ?? ''}
        />
        <main className='relative h-full flex-1 overflow-y-auto overflow-x-hidden'>{children}</main>
        <ProjectModal />
      </div>
    </div>
  );
}
