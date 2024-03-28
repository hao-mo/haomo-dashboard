import prismadb from '@/lib/prismadb';

import { NotificationDropdown } from '../notification/notification-dropdown';
import ProjectSwitcher from '../project-switcher';

export const Header = async ({ userId }: { userId: string }) => {
  console.log('🚨 - userId', userId);

  const projects = await prismadb.projects.findMany({
    where: {
      userId,
    },
  });
  console.log('🚨 - projects', projects);

  return (
    <header className='sticky top-0 z-3 flex min-h-20 w-full border-b border-border bg-background shadow-sm dark:drop-shadow-none'>
      <div className='flex grow items-center justify-between p-4 lg:px-6'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <ProjectSwitcher items={projects} />
          {/* <PageTitle /> */}
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};
