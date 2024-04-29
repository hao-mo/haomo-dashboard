import React from 'react';
import { type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { Locale } from '@/lib/locales';
import { defaultLocale, locales } from '@/lib/locales';

interface LocaleFieldListProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  children: (props: {
    name: `${TName}.${Locale}`;
    control: Control<TFieldValues>;
  }) => React.ReactNode;
  className?: string;
}

export const LocaleFieldList = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  className,
  children,
}: LocaleFieldListProps<TFieldValues, TName>) => {
  const localeOptions = Object.entries(locales);

  const defaultValue = Object.keys(defaultLocale)[0];

  return (
    <Tabs
      className={className}
      defaultValue={defaultValue}
    >
      <TabsList className='grid h-fit w-full grid-cols-3'>
        {localeOptions.map(([locale, { name: localeName }]) => (
          <TabsTrigger
            key={locale}
            value={locale}
          >
            {localeName}
          </TabsTrigger>
        ))}
      </TabsList>
      {localeOptions.map(([locale]) => (
        <TabsContent
          key={locale}
          value={locale}
        >
          {children({
            name: `${name}.${locale}` as `${TName}.${Locale}`,
            control,
          })}
        </TabsContent>
      ))}
    </Tabs>
  );
};
