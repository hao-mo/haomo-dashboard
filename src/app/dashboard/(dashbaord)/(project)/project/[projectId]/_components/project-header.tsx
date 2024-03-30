import { NotificationDropdown } from '@/components/notification/notification-dropdown';
import { ProjectSwitcher } from '@/components/project-switcher';

import prismadb from '@/lib/prismadb';

export const ProjectHeader = async ({ userId }: { userId: string }) => {
  const projects = await prismadb.projects.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className='sticky top-0 z-3 flex min-h-16 w-full border-b border-border bg-background shadow-sm dark:drop-shadow-none'>
      <div className='flex grow items-center justify-between p-4 lg:px-6'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <ProjectSwitcher items={projects} />
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};
