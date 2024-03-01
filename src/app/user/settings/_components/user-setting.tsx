import { cn } from '@/utils';

export const UserSetting = ({ className, children }: PropsWithChildren & WithClassName) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-10 border-b border-muted-foreground/20 pb-12 md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const UserSettingHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className='text-base font-semibold text-foreground'>{title}</h2>
      <p className='mt-1 text-sm text-foreground/80'>{description}</p>
    </div>
  );
};

export const UserSettingContent = ({ children }: PropsWithChildren) => {
  return (
    <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
      {children}
    </div>
  );
};
