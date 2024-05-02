'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, Reorder } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { AddButton } from '@/components/add-button';
import { ContentDragListItem } from '@/components/content-editor/content-drag-list-item';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import useEventListener from '@/hooks/use-event-listener';
import { useMount } from '@/hooks/use-mount';
import { useOpen } from '@/hooks/use-open';

import { defaultLocaleString } from '@/lib/locales';
import { CONTENT_TYPE, type ContentWithId } from '@/lib/types';

import type { FormattedNews } from '../../type';
import type { NewsFormValues } from '../schema';
import { newsFormSchema } from '../schema';

import { LocaleFieldList } from './locale-field-list';
import { NewsContentForm } from './news-content-form';

export const NewsForm = ({ initialData }: { initialData: FormattedNews | null }) => {
  const router = useRouter();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useOpen();
  const [loading, setLoading] = useState(false);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: initialData ?? {
      slug: '',
      isDeleted: false,
      headline: defaultLocaleString,
      description: defaultLocaleString,
      date: new Date(),
      articles: [
        {
          type: CONTENT_TYPE.HEADING,
          text: {
            default: 'Heading',
            'zh-TW': '標題',
            'en-US': 'Heading',
            'ja-JP': '見出し',
          },
          formattedText: '標題',
        },
        {
          type: CONTENT_TYPE.PARAGRAPH,
          formattedText: '歡迎來到我們的範例文字',
          text: {
            default: '歡迎來到我們的範例文字',
            'zh-TW': '歡迎來到我們的範例文字',
            'en-US': 'Welcome to our example text',
            'ja-JP': '私たちの例文へようこそ',
          },
        },
        {
          type: CONTENT_TYPE.HEADING,
          text: {
            default: 'Heading',
            'zh-TW': '標題',
            'en-US': 'Heading',
            'ja-JP': '見出し',
          },
          formattedText: '標題',
          // level: 2,
        },
      ],
    },
  });

  const { fields, update, remove, append } = useFieldArray({
    control: form.control,
    name: 'articles',
  });

  const [items, setItems] = useState<ContentWithId[]>(fields);

  const isMount = useMount();

  console.log('form values', form.getValues());

  const onDelete = async (data: NewsFormValues) => {};

  const onSubmit = async (data: NewsFormValues) => {};

  const handleUpdateContent = (index: number) => async (content: ContentWithId) => {
    const newItems = items.map((item, i) => (i === index ? content : item));
    setItems(newItems);
    update(index, content);
  };

  const handleDeleteContent = (index: number) => {
    remove(index);
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateContent = async (data: ContentWithId) => {
    append(data);
    setItems([...items, data]);
    onClose();
  };

  useEventListener(
    'beforeunload',
    (event) => {
      if (!form.formState.isDirty) return;
      event.preventDefault();
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
        className='space-y-4 divide-y divide-border'
      >
        <FormField
          name='date'
          control={form.control}
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel className='text-sm'>發布日期</FormLabel>
              <DatePicker
                className='flex'
                selected={field.value}
                onSelect={field.onChange}
                required
                withForm
              />
            </FormItem>
          )}
        />

        <div className='relative py-4'>
          <FormLabel className='text-sm'>標題</FormLabel>
          <LocaleFieldList
            name='headline'
            control={form.control}
          >
            {({ name, control }) => (
              <FormField
                name={name}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <Input {...field} />
                  </FormItem>
                )}
              />
            )}
          </LocaleFieldList>
        </div>
        <div className='relative py-4'>
          <FormLabel className='text-sm'>說明</FormLabel>
          <LocaleFieldList
            name='description'
            control={form.control}
          >
            {({ name, control }) => (
              <FormField
                name={name}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      className='h-32'
                    />
                  </FormItem>
                )}
              />
            )}
          </LocaleFieldList>
        </div>

        <div className='w-full py-4'>
          <div className='mb-4 flex items-center justify-between'>
            <Label className='text-sm'>內文</Label>
            <AddButton onClick={onOpen} />
          </div>
          <Modal
            title='新增內文區塊'
            description='請選擇一個區塊類型，並填寫內容'
            isOpen={isOpen}
            onClose={onClose}
          >
            <NewsContentForm onCreate={handleCreateContent} />
          </Modal>
          <Reorder.Group
            axis='y'
            values={items}
            onReorder={setItems}
            layoutScroll
            className='mt-2 space-y-4 overflow-hidden rounded-md border bg-muted/50 p-4 md:p-8'
          >
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <ContentDragListItem
                  key={item.id}
                  item={item}
                  onDelete={() => handleDeleteContent(index)}
                >
                  <NewsContentForm
                    content={item}
                    onUpdate={handleUpdateContent(index)}
                    onDelete={() => handleDeleteContent(index)}
                  />
                </ContentDragListItem>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      </form>
    </Form>
  );
};
