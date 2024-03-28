import prismadb from '@/lib/prismadb';

import { redirectToPath } from '@/utils/auth-helpers/server';
import { getSupabaseServerClient } from '@/utils/supabase/server';

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
  console.log('🚨 - project', project);

  if (!project) {
    return redirectToPath(`/`);
  }

  return <>{children}</>;
}
