import { XIcon } from 'lucide-react';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

import type { Tag } from '@/lib/types';

import type { NewsFormValues } from '../schema';

import { useLocaleStore } from '@/stores/locale-store';

interface TagFieldProps {
  control: Control<NewsFormValues>;
  allTags: Tag[];
}

export const TagFieldList = ({ control, allTags }: TagFieldProps) => {
  const defaultLocale = useLocaleStore((state) => state.locale);
  const { fields, append, update, remove } = useFieldArray({
    name: 'newsTags',
    control,
  });

  return (
    <div className='relative flex-1 py-4'>
      <Label className='mb-2 inline-block text-sm'>標籤</Label>
      <div className='rounded-md border p-2'>
        <div className='flex flex-wrap items-center gap-2'>
          {fields.map((field, index) => (
            <Badge
              key={field.id}
              variant='secondary'
              className='group relative shrink-0'
            >
              {field.value[defaultLocale]}
              <button
                className='absolute -right-1.5 -top-1.5 rounded-full border bg-background p-px text-xs text-foreground/50 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'
                type='button'
                onClick={() => remove(index)}
              >
                <XIcon size={12} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      {/* <LocaleFieldList
        name={`${name}.value`}
        control={control}
      ></LocaleFieldList> */}
    </div>
  );
};
