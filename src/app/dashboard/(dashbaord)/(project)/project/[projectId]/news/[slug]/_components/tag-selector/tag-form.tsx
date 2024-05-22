import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AddButton } from '@/components/add-button';
import { SubmitButton } from '@/components/submit-button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TagFormValues } from '@/lib/schemas/schema';
import { tagSchema } from '@/lib/schemas/schema';
import type { Tag } from '@/lib/types';

import { LocaleField } from '../locale-field';

import { defaultLocaleString } from '@/stores/locale-store';

export function stopPropagate(callback: () => void) {
  return (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    callback();
  };
}

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
          name: initialValue.name,
          value: {
            ...defaultLocaleString,
            ...initialValue.value,
          },
        }
      : {
          id: '',
          name: '',
          value: defaultLocaleString,
        },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }

    return form.handleSubmit(onSubmit)(event);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className='grid gap-4'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>名稱</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='py-4'>
          <Label className='mb-2 inline-block'>顯示名稱</Label>
          <LocaleField
            type='text'
            name='value'
            control={form.control}
          />
        </div>
        <div className='mt-4 flex items-center justify-end'>
          {initialValue ? (
            <SubmitButton
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              變更
            </SubmitButton>
          ) : (
            <AddButton
              type='submit'
              disabled={form.formState.isSubmitting}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
