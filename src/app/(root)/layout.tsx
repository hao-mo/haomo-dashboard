import prismadb from '@/lib/prismadb';

import { redirectToPath } from '@/utils/auth-helpers/server';
import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
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

  if (project) {
    return redirectToPath(`/${project.id}`);
  }

  return <>{children}</>;
}
