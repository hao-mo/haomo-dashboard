'use client';

import { FormItem, FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

export const UserSettingHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className='mb-6 flex flex-col justify-center text-left'>
      <h2 className='mb-1 w-fit text-sm font-semibold text-foreground'>{title}</h2>
      {description && <p className='w-fit text-xs text-foreground/80'>{description}</p>}
    </div>
  );
};

export const UserSettingArea = ({ children }: PropsWithChildren) => {
  return (
    <div className='overflow-hidden rounded-md border border-border bg-muted/50'>
      <fieldset className='relative flex flex-col gap-0 divide-y divide-border'>
        {children}
      </fieldset>
    </div>
  );
};

export const UserSettingGroup = ({ children }: PropsWithChildren) => {
  return <div className='grid grid-cols-12 gap-6 space-y-0 p-8'>{children}</div>;
};

export const UserSettingGroupLabel = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className='col-span-12 text-foreground lg:col-span-5'>
      <Label className='text-sm font-medium'>{title}</Label>
      {description && <p className='text-xs text-foreground/80'>{description}</p>}
    </div>
  );
};

export const UserSettingGroupContent = ({ children }: PropsWithChildren) => {
  return <div className='relative col-span-12 flex flex-col gap-6 lg:col-span-7'>{children}</div>;
};

export const UserSettingFormItem = ({ children }: PropsWithChildren) => {
  return <FormItem className='grid grid-cols-12 gap-6 p-8 md:space-y-0'>{children}</FormItem>;
};

export const UserSettingFormContent = ({ children }: PropsWithChildren) => {
  return <div className='relative col-span-12 flex flex-col gap-2 lg:col-span-7'>{children}</div>;
};

export const UserSettingFormLabel = ({ children }: PropsWithChildren) => {
  return (
    <div className='col-span-12 text-xs text-foreground lg:col-span-5'>
      <FormLabel>{children}</FormLabel>
    </div>
  );
};

export const UserSettingFooter = ({ children }: PropsWithChildren) => {
  return <footer className='flex items-center justify-end gap-x-2 px-8 py-4'>{children}</footer>;
};
