'use client';

import { DndContext } from '@dnd-kit/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Draggable } from '@/components/draggable';
import { Droppable } from '@/components/droppable';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { defaultLocaleString, localeSchema } from '@/lib/locales';

import type { News } from '../../type';

import { LocaleFormItem } from './locale-form-item';

const formSchema = z.object({
  // format is an object of locales key to string
  formattedHeadline: localeSchema,
  formattedDescription: localeSchema,
  date: z.date(),
});

type NewsFormValues = z.infer<typeof formSchema>;

export const NewsForm = ({ initialData }: { initialData?: News }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const form = useForm<NewsFormValues>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      formattedHeadline: defaultLocaleString,
      formattedDescription: defaultLocaleString,
      date: new Date(),
    },
  });

  console.log('form values', form.getValues());

  const onSubmit = async (data: NewsFormValues) => {};

  const onDelete = async (data: NewsFormValues) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          name='date'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm'>發布日期</FormLabel>
              <DatePicker
                selected={field.value}
                onSelect={field.onChange}
                required
                withForm
              />
            </FormItem>
          )}
        />
        <LocaleFormItem
          label='標題'
          name='formattedHeadline'
        />
        <LocaleFormItem
          label='說明'
          name='formattedDescription'
        />
        <DndContext
          onDragEnd={(event) => {
            if (event.over && event.over.id === 'droppable') {
              setIsDropped(true);
            }
          }}
        >
          {!isDropped ? draggableMarkup : null}
          <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
        </DndContext>
      </form>
    </Form>
  );
};
