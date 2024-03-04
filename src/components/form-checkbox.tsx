'use client';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { Checkbox } from './ui/checkbox';

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label: string;
  description: string;
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className='relative'>
          <div className='flex items-start gap-x-3'>
            <Checkbox
              id={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <div className='space-y-2 text-sm leading-none'>
              <FormLabel htmlFor={field.name}>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
