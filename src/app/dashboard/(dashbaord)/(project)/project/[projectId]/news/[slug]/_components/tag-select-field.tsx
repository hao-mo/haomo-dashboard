import type { Control } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

import type { Tag } from '@/lib/types';

import type { NewsFormValues } from '../schema';

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

  const { setValue } = useFormContext();

  return (
    <div className='relative py-4'>
      <Label className='mb-2 inline-block text-sm'>標籤</Label>
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
          setValue('newsTags', tags, { shouldDirty: true });
        }}
        additionalAction={(option) => (
          <TagAction
            item={option}
            value={allNewsTags.find((tag) => tag.id === option.value)?.value}
          />
        )}
      />
    </div>
  );
};
