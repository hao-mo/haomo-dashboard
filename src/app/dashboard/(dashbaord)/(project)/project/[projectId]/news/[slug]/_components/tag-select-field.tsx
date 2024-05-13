import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import type { Tag } from '@/lib/types';

import type { NewsFormValues } from '../_lib/schema';

import { TagAction } from './tag-action';

import { useLocaleStore } from '@/stores/locale-store';

interface TagSelectFieldProps {
  control: Control<NewsFormValues>;
  allNewsTags: Tag[];
}

export const TagSelectField = ({ control, allNewsTags }: TagSelectFieldProps) => {
  const defaultLocale = useLocaleStore((state) => state.locale);

  const newsTags = useWatch({
    name: 'newsTags',
    control,
    exact: true,
  });

  return (
    <FormField
      name='newsTags'
      control={control}
      render={({ field }) => (
        <FormItem className='relative py-4'>
          <FormLabel>標籤</FormLabel>
          <FormControl>
            <MultiSelect
              options={allNewsTags.map((tag) => ({
                name: tag.value[defaultLocale] ?? '',
                value: tag.id,
              }))}
              selected={newsTags.map((tag) => ({
                name: tag.value[defaultLocale] ?? '',
                value: tag.id,
              }))}
              onValueChange={(values) => {
                const tags = values.map((value) => ({
                  value: {
                    ...allNewsTags.find((tag) => tag.id === value.value)?.value,
                    [defaultLocale]: value.name,
                  },
                  id: value.value,
                }));
                field.onChange(tags);
              }}
              additionalAction={(option) => (
                <TagAction
                  item={option}
                  value={allNewsTags.find((tag) => tag.id === option.value)?.value}
                />
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
