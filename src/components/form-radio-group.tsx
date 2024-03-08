'use client';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import type { Option } from '@/lib/types';

import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface FormRadioGroupProps {
  label?: string;
  description?: string;
  options: Option[];
}

export const FormRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  options,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & FormRadioGroupProps) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className='space-y-3'>
          {label && <FormLabel>{label}</FormLabel>}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <RadioGroup
              name={field.name}
              value={field.value}
              defaultValue={field.value}
              onValueChange={field.onChange}
              className='flex flex-col space-y-6'
            >
              {options.map((option) => (
                <FormItem
                  className='flex items-center space-x-3 space-y-0'
                  key={`radio-option-${option.name}-${option.value}`}
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel>{option.name}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
