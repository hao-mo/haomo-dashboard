import { ScreenReader } from '@/components/ui/screen-reader';

import { cn } from '@/utils';

export const Hamburger = ({
  className,
  open,
  toggleOpen,
}: { open: boolean; toggleOpen: () => void } & WithClassName) => {
  return (
    <button
      type='button'
      className={cn(
        'group relative flex size-6 items-center justify-center overflow-hidden rounded-full bg-background focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
        className
      )}
      aria-label='menu'
      aria-expanded={open}
      onClick={toggleOpen}
    >
      {Array.from({ length: 2 }, (_, index) => (
        <HamburgerLine
          key={`line-${index}`}
          index={index}
          open={open}
        />
      ))}
      <ScreenReader>Open Menu</ScreenReader>
    </button>
  );
};

const HamburgerLine = ({ index, open }: { index: number; open: boolean }) => (
  <div
    className={cn(
      'absolute left-0 right-0 mx-auto block h-0.5 w-full bg-foreground transition-[background-color,transform] duration-500 ease-in-expo transform-style-3d',
      index === 0 ? '-translate-y-1' : ' translate-y-1',
      { 'rotate-45': index === 0 && open },
      { '-rotate-45': index === 1 && open },
      { 'translate-y-0': open }
    )}
  />
);
