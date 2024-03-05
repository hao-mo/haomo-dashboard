import { cn } from '@/utils';

export function DataTableFooter({ className, children }: PropsWithChildren & WithClassName) {
  return (
    <div className={cn('flex items-center justify-between px-2 py-4', className)}>{children}</div>
  );
}
