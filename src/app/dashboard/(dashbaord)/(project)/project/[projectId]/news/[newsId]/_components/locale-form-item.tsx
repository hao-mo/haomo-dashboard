'use client';

import { CircleAlertIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { locales } from '@/lib/locales';

const localeOptions = Object.entries(locales);

export const LocaleFormItem = ({ label, name }: { label: string; name: string }) => {
  const { control } = useFormContext();

  return (
    <div>
      <FormLabel className='text-sm'>{label}</FormLabel>

      <div className='mt-2 w-full space-y-4 rounded-md border border-border bg-muted/50 p-4'>
        {localeOptions.map(([locale, { name: localeName }]) => (
          <FormField
            key={`${name}.${locale}`}
            control={control}
            name={`${name}.${locale}`}
            render={({ field, fieldState }) => (
              <FormItem className='w-full'>
                <div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                  <FormLabel className='shrink-0 text-xs font-normal'>{localeName}</FormLabel>

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
        ))}
      </div>
    </div>
  );
};
