import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { siteRoutes } from '@/lib/routes';
import { fadeInLeft } from '@/lib/transitions';
import { cn } from '@/utils';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { MotionTypography } from '../typography';

import { useSidebar } from '.';

export const SidebarNav = () => {
  return (
    <TooltipProvider
      delayDuration={500}
      disableHoverableContent
    >
      <nav className='no-scrollbar mt-4 flex-1 overflow-y-auto'>
        <ul className='flex flex-col px-4'>
          {siteRoutes.map((route, i) => (
            <SidebarNavItem
              key={i}
              icon={route.icon}
              href={route.href}
              name={route.name}
            />
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  );
};

interface SidebarNavItemProps {
  name: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

const SidebarNavItem = ({ icon, name, href, active }: SidebarNavItemProps) => {
  const { isVisible } = useSidebar();
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <li
          className={cn(
            'group relative my-1 flex h-10 cursor-pointer items-center overflow-hidden rounded-md p-2.5 font-medium transition-colors duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground',
            'data-[active="true"]:bg-primary data-[active="true"]:text-primary-foreground'
          )}
          data-active={active}
          onClick={() => router.push(href)}
        >
          <span className='flex items-center justify-center'>{icon}</span>
          <div className='flex-1 overflow-hidden'>
            <AnimatePresence
              mode='wait'
              initial={false}
            >
              {isVisible && (
                <MotionTypography
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  variants={fadeInLeft}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  className='ml-4 inline-block flex-1'
                >
                  {name}
                </MotionTypography>
              )}
            </AnimatePresence>
          </div>
        </li>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
