import { Home } from 'lucide-react';

import { TooltipProvider } from '../tooltip';

import { SidebarNavItem } from './sidebar-nav-item';

export const SidebarNav = () => {
  return (
    <TooltipProvider
      delayDuration={500}
      disableHoverableContent
    >
      <nav className='no-scrollbar mt-4 flex-1 overflow-y-auto'>
        <ul className='flex flex-col px-4'>
          {Array.from({ length: 40 }).map((_, i) => (
            <SidebarNavItem
              key={i}
              icon={
                <Home
                  size={20}
                  className=''
                />
              }
              href='/user'
              text='首頁'
            />
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  );
};
