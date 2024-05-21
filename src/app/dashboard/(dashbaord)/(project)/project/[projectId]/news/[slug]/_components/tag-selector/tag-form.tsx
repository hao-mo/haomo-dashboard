import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/components/submit-button';
import { Form } from '@/components/ui/form';

import type { TagFormValues } from '@/lib/schemas/schema';
import { tagSchema } from '@/lib/schemas/schema';
import type { Tag } from '@/lib/types';

import { LocaleField } from '../locale-field';

import { defaultLocaleString } from '@/stores/locale-store';

interface TagFormProps {
  initialValue: Tag | null;
  onSubmit: (values: TagFormValues) => Promise<void>;
}

export const TagForm = ({ initialValue, onSubmit }: TagFormProps) => {
  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: initialValue
      ? {
          id: initialValue.id,
          value: {
            ...defaultLocaleString,
            ...initialValue.value,
          },
        }
      : {
          id: '',
          value: defaultLocaleString,
        },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          form.handleSubmit(onSubmit)(event);
        }}
      >
        <LocaleField
          type='text'
          name='value'
          control={form.control}
        />
        <div className='mt-4 flex items-center justify-end'>
          <SubmitButton
            // type='button'
            // onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            變更
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};
