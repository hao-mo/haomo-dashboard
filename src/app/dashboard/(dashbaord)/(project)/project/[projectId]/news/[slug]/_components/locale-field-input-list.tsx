'use client';

import { CircleAlertIcon } from 'lucide-react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { locales } from '@/lib/locales';

const localeOptions = Object.entries(locales);

export const LocaleFieldInputList = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
}: {
  label: string;
} & Pick<ControllerProps<TFieldValues, TName>, 'control' | 'name' | 'disabled'>) => {
  return (
    <div className='w-full py-4'>
      <Label className='text-sm'>{label}</Label>

      <div className='mt-2 w-full space-y-4 p-4'>
        {localeOptions.map(([locale, { name: localeName }]) => (
          <LocaleFiledInput
            key={`${name}.${locale}`}
            // control={control}
            name={`${name}.${locale}`}
            label={localeName}
          />
        ))}
      </div>
    </div>
  );
};

const LocaleFiledInput = ({
  label,
  name,
  // control,
}: {
  label: string;
  name: string;
  // control: Control;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className='w-full'>
          <div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
            <FormLabel className='shrink-0 text-xs font-normal'>{label}</FormLabel>

            <div className='relative inline-flex w-full items-center justify-end'>
              {fieldState.error && (
                <TooltipProvider delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlertIcon className='mr-4 size-4 text-destructive' />
                    </TooltipTrigger>
                    <TooltipContent
                      variant='destructive'
                      side='left'
                    >
                      {fieldState.error.message}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <FormControl>
                <Input
                  {...field}
                  className='max-w-lg'
                />
              </FormControl>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
