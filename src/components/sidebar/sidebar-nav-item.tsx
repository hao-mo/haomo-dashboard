import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { fadeInLeft } from '@/lib/transitions';
import { cn } from '@/utils';

import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { MotionTypography } from '../typography';

import { useSidebar } from '.';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

export const SidebarNavItem = ({ icon, text, href, active }: SidebarNavItemProps) => {
  const { expanded } = useSidebar();
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
              {expanded && (
                <MotionTypography
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  variants={fadeInLeft}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  className='ml-4 inline-block flex-1'
                >
                  {text}
                </MotionTypography>
              )}
            </AnimatePresence>
          </div>
        </li>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
