'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, Reorder } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ContentDragListItem } from '@/components/content-editor/content-drag-list-item';
import { ContentForm } from '@/components/content-editor/content-form';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import useEventListener from '@/hooks/use-event-listener';
import { useMount } from '@/hooks/use-mount';

import { defaultLocaleString } from '@/lib/locales';
import { contentSchema } from '@/lib/schemas/content.schema';
import { localeSchema } from '@/lib/schemas/locale.schema';
import type { ContentWithId } from '@/lib/types';

import type { FormattedNews } from '../../type';

import { LocaleFieldInputList } from './locale-field-input-list';

// const articleSchema = z.object({
//   contents: z.array(contentSchema),
// });

const formSchema = z.object({
  // format is an object of locales key to string
  headline: localeSchema,
  description: localeSchema,
  date: z.date(),
  articles: z.array(contentSchema),
});

type NewsFormValues = z.infer<typeof formSchema>;

export const NewsForm = ({ initialData }: { initialData?: FormattedNews }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<ContentWithId[]>([
    {
      id: nanoid(),
      type: 'heading',
      text: {
        content: {
          default: 'Heading',
          'zh-TW': '標題',
          'en-US': 'Heading',
          'ja-JP': '見出し',
        },
        formattedContent: '標題',
      },
      level: 1,
    },
    {
      id: nanoid(),
      type: 'paragraph',
      text: {
        formattedContent: '歡迎來到我們的範例文字',
        content: {
          default: '歡迎來到我們的範例文字',
          'zh-TW': '歡迎來到我們的範例文字',
          'en-US': 'Welcome to our example text',
          'ja-JP': '私たちの例文へようこそ',
        },
      },
    },
    {
      id: nanoid(),
      type: 'heading',
      text: {
        content: {
          default: 'Heading',
          'zh-TW': '標題',
          'en-US': 'Heading',
          'ja-JP': '見出し',
        },
        formattedContent: '標題',
      },
      level: 2,
    },
  ]);

  const [selectItem, setSelectItem] = useState<ContentWithId | null>(items[0] ?? null);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      headline: defaultLocaleString,
      description: defaultLocaleString,
      date: new Date(),
      articles: [
        {
          type: 'heading',
          text: {
            content: {
              default: 'Heading',
              'zh-TW': '標題',
              'en-US': 'Heading',
              'ja-JP': '見出し',
            },
            formattedContent: '標題',
          },
          level: 1,
        },
        {
          type: 'paragraph',
          text: {
            formattedContent: '歡迎來到我們的範例文字',
            content: {
              default: '歡迎來到我們的範例文字',
              'zh-TW': '歡迎來到我們的範例文字',
              'en-US': 'Welcome to our example text',
              'ja-JP': '私たちの例文へようこそ',
            },
          },
        },
        {
          type: 'heading',
          text: {
            content: {
              default: 'Heading',
              'zh-TW': '標題',
              'en-US': 'Heading',
              'ja-JP': '見出し',
            },
            formattedContent: '標題',
          },
          level: 2,
        },
      ],
    },
  });

  const isMount = useMount();

  // console.log('form values', form.getValues());

  const handleSelectItem = (index: number) => {
    setSelectItem(items[index]);
  };

  const handleDeleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: NewsFormValues) => {};

  const onDelete = async (data: NewsFormValues) => {};

  useEventListener(
    'beforeunload',
    (event) => {
      if (!form.formState.isDirty) return;
      event.preventDefault();
      event.returnValue = '';
    },
    undefined,
    [form.formState.isDirty],
    { capture: true }
  );

  if (!isMount) return null;

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
        <LocaleFieldInputList
          label='標題'
          control={form.control}
          name='headline'
        />
        <LocaleFieldInputList
          label='說明'
          control={form.control}
          name='description'
        />
        <div className='w-full'>
          <Label className='text-sm'>內文</Label>
          <div className='mt-2 grid w-full grid-cols-12 gap-4'>
            <div className='col-span-full lg:col-span-5'>
              <Reorder.Group
                axis='y'
                values={items}
                onReorder={setItems}
                layoutScroll
                className='space-y-4 overflow-hidden rounded-md border bg-muted/50 p-4'
              >
                <AnimatePresence initial={false}>
                  {items.map((item, index) => (
                    <ContentDragListItem
                      key={item.id}
                      item={item}
                      isSelected={selectItem?.id === item.id}
                      onSelect={() => handleSelectItem(index)}
                      onDelete={() => handleDeleteItem(index)}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
            <div className='col-span-full lg:col-span-7'>
              <ContentForm
                content={selectItem}
                onUpdate={() => {}}
                onCreate={() => {}}
              />
            </div>
          </div>
        </div>
        {/* <ContentEditor name='articles' /> */}
      </form>
    </Form>
  );
};
