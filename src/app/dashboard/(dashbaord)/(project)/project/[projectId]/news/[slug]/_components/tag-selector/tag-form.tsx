'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { revalidateTag } from 'next/cache';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubmitButton } from '@/components/submit-button';
import { Form } from '@/components/ui/form';

import type { TagFormValues } from '@/lib/schemas/schema';
import { tagSchema } from '@/lib/schemas/schema';
import type { Tag } from '@/lib/types';

import { createNewsTag, updateNewsTag } from '../../actions';
import { LocaleField } from '../locale-field';

import { defaultLocaleString } from '@/stores/locale-store';

interface TagFormProps {
  initialValue: Tag | null;
  onClose: () => void;
}

export const TagForm = ({ initialValue, onClose }: TagFormProps) => {
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

  const onCreate = async (values: TagFormValues) => {
    try {
      await createNewsTag(values.value);
      toast.success('更新成功');
      onClose();
    } catch (error) {
      console.log('error', error);
      toast.error('更新失敗');
    }
  };

  const onUpdate = async (values: TagFormValues) => {
    try {
      await updateNewsTag(values.id, values.value);
      toast.success('更新成功');
      revalidateTag('news-tags');
      onClose();
    } catch (error) {
      console.log('error', error);
      toast.error('更新失敗');
    }
  };

  const onSubmit = async (values: TagFormValues) => {
    console.log('🚨 - values', values);
    if (values.id) {
      await onUpdate(values);
    } else {
      await onCreate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LocaleField
          type='text'
          name='value'
          control={form.control}
        />
        <div className='mt-4 flex items-center justify-end'>
          <SubmitButton
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
