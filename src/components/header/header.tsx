import { Hamburger } from './hamburger';
import { HeaderThemedLogo } from './header-themed-logo';

export const Header = () => {
  return (
    <header className='sticky top-0 z-3 flex w-full bg-background shadow-sm dark:drop-shadow-none'>
      <div className='flex grow items-center justify-between p-4 shadow-md md:px-6'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          <Hamburger />
          <HeaderThemedLogo />
        </div>
      </div>
    </header>
  );
};
