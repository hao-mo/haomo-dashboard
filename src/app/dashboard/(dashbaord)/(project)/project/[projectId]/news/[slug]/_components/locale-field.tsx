import { useEffect, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import type { Locale } from '@/stores/locale-store';
import { locales, useLocaleStore } from '@/stores/locale-store';

interface LocalFieldBaseProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends WithClassName {
  name: TName;
  control: Control<TFieldValues>;
  disabled?: boolean;
  tabClassName?: string;
}

interface TextLocaleFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends LocalFieldBaseProps<TFieldValues, TName> {
  type: 'text';
}

interface TextareaLocaleFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends LocalFieldBaseProps<TFieldValues, TName> {
  type: 'textarea';
}

type LocaleFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  | TextLocaleFieldProps<TFieldValues, TName>
  | TextareaLocaleFieldProps<TFieldValues, TName>;

function getLocaleName<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  baseName: TName,
  locale: Locale
): `${TName}.${Locale}` {
  return `${baseName}.${locale}` as const;
}

export const LocaleField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type = 'text',
  name,
  control,
  tabClassName,
  disabled,
  className,
}: LocaleFieldProps<TFieldValues, TName>) => {
  const defaultLocale = useLocaleStore((state) => state.locale);

  const [tab, setTab] = useState<Locale>(defaultLocale);

  const localeOptions = Object.entries(locales);

  const { getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  useEffect(() => {
    if (!fieldState.error) return;
    setTab(Object.keys(fieldState.error)[0] as Locale);
  }, [fieldState.error]);

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Locale)}
      className={tabClassName}
    >
      <TabsList className='grid h-fit w-full grid-cols-3'>
        {localeOptions.map(([locale, { name: localeName }]) => (
          <TabsTrigger
            key={locale}
            value={locale}
            disabled={disabled}
          >
            {localeName}
          </TabsTrigger>
        ))}
      </TabsList>
      {localeOptions.map(([locale]) => (
        <TabsContent
          key={locale}
          value={locale}
          tabIndex={-1}
        >
          <FormField
            name={getLocaleName(name, locale as Locale) as TName}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {type === 'text' ? (
                    <Input
                      {...field}
                      className={className}
                      disabled={disabled}
                    />
                  ) : (
                    <Textarea
                      {...field}
                      className={className}
                      disabled={disabled}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
