'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AddButton } from '@/components/add-button';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import useEventListener from '@/hooks/use-event-listener';
import { useJumpToErrorInput } from '@/hooks/use-jump-to-error-input';
import { useMount } from '@/hooks/use-mount';
import { useOpen } from '@/hooks/use-open';

import { CONTENT_TYPE, type ContentWithId } from '@/lib/types';

import type { FormattedNews } from '../../type';
import { updateNews } from '../actions';
import type { NewsFormValues } from '../schema';
import { newsFormSchema } from '../schema';

import { DeleteNewsModel } from './delete-news-model';
import { ImageUploadField } from './image-upload-field';
import { LocaleFieldList } from './locale-field-list';
import { ContentForm, ContentList } from './news-content';

import { useLocaleStore } from '@/stores/locale-store';

export const NewsForm = ({ initialData }: { initialData: FormattedNews | null }) => {
  const router = useRouter();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useOpen();

  const defaultLocale = useLocaleStore((state) => state.locale);

  const defaultLocaleString = {
    [defaultLocale]: '',
  };

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
            'zh-TW': '歡迎來到我們的範例文字',
            'en-US': 'Welcome to our example text',
            'ja-JP': '私たちの例文へようこそ',
          },
        },
        {
          type: CONTENT_TYPE.HEADING,
          text: {
            'zh-TW': '標題',
            'en-US': 'Heading',
            'ja-JP': '見出し',
          },
          formattedText: '標題',
        },
      ],
    },
  });

  useJumpToErrorInput(form.formState.errors);

  const { fields, update, remove, append } = useFieldArray({
    control: form.control,
    name: 'articles',
  });

  const [items, setItems] = useState<ContentWithId[]>(fields);

  const isMount = useMount();

  console.log('form error', form.formState.errors);

  const onSubmit = async (data: NewsFormValues) => {
    try {
      if (initialData) {
        await updateNews(initialData.id, data);
        toast.success('更新成功');
        router.push(`/dashboard/project/${params.projectId}/news`);
      } else {
      }
    } catch (error) {
      if (initialData) {
        toast.error('更新失敗');
      } else {
        toast.error('新增失敗');
      }
    }
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
        className='grid grid-cols-12 lg:gap-x-8'
      >
        <div className='col-span-full flex flex-col justify-between lg:col-span-4'>
          <FormField
            name='date'
            control={form.control}
            render={({ field }) => (
              <FormItem className='py-4'>
                <FormLabel
                  className='text-sm'
                  id='date'
                >
                  發布日期
                </FormLabel>
                <DatePicker
                  className='flex w-full'
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
            <Label className='mb-2 inline-block text-sm'>說明</Label>
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
                        className='h-40'
                      />
                    </FormItem>
                  )}
                />
              )}
            </LocaleFieldList>
          </div>
        </div>
        <div className='col-span-full flex flex-col justify-between lg:col-span-8'>
          <div className='relative py-4'>
            <FormLabel className='text-sm'>封面圖片</FormLabel>
            <ImageUploadField
              name='file'
              control={form.control}
              defaultImageUrl={
                form.getValues('file')
                  ? URL.createObjectURL(form.getValues('file') as File)
                  : form.getValues('imageUrl')
              }
              defaultAlt={form.getValues('formattedAlt')}
            />
          </div>
          <div className='relative py-4'>
            <FormLabel className='text-sm'>圖片說明</FormLabel>
            <LocaleFieldList
              name='alt'
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
        </div>

        <div className='col-span-full w-full py-4'>
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
            <ContentForm onCreate={handleCreateContent} />
          </Modal>
          <ContentList
            items={items}
            setItems={setItems}
            onUpdate={update}
            onDelete={remove}
          />
        </div>
        <div className='col-span-full flex w-full items-center justify-end gap-x-2'>
          {initialData ? (
            <DeleteNewsModel id={initialData.id} />
          ) : (
            <Button
              type='button'
              variant='secondary'
              onClick={() => router.back()}
            >
              取消
            </Button>
          )}
          <SubmitButton
            type='submit'
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            loading={form.formState.isSubmitting}
          >
            儲存
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};
