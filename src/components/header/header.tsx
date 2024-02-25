import { NotificationDropdown } from '../notification/notification-dropdown';

import { Hamburger } from './hamburger';
import { HeaderThemedLogo } from './header-themed-logo';
import { PageTitle } from './page-title';
import { ThemeSwitch } from './theme-switch';
import { UserDropdown } from './user-dropdown';

export const Header = () => {
  return (
    <header className='sticky top-0 z-3 flex h-20 w-full border-b border-border bg-background shadow-sm dark:drop-shadow-none'>
      <div className='flex grow items-center justify-between p-4 md:px-6'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <Hamburger />
          <HeaderThemedLogo />
          <PageTitle />
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <NotificationDropdown />
          <ThemeSwitch />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
