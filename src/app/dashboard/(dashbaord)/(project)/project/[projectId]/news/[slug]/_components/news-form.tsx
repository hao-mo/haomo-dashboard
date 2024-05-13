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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import useEventListener from '@/hooks/use-event-listener';
import { useJumpToErrorInput } from '@/hooks/use-jump-to-error-input';
import { useMount } from '@/hooks/use-mount';
import { useOpen } from '@/hooks/use-open';

import type { Tag } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

import { DeleteNewsModal } from '../../_components/delete-news-modal';
import type { FormattedNews } from '../../type';
import { statusOptions } from '../_lib';
import type { ContentWithId, NewsFormValues } from '../_lib/schema';
import { newsFormSchema } from '../_lib/schema';
import { createNews, rollbackNews, updateNews } from '../actions';

import { TagSelectField } from './tag/tag-select-field';
import { ImageUploadField } from './image-upload-field';
import { LocaleFieldList } from './locale-field-list';
import { ContentForm, ContentList } from './news-content';

import { defaultLocaleString } from '@/stores/locale-store';

interface NewsFormProps {
  initialData: FormattedNews | null;
  allNewsTags: Tag[];
}

export const NewsForm = ({ initialData, allNewsTags }: NewsFormProps) => {
  const router = useRouter();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useOpen();

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          headline: {
            ...defaultLocaleString,
            ...initialData.headline,
          },
          description: {
            ...defaultLocaleString,
            ...initialData.description,
          },
          alt: {
            ...defaultLocaleString,
            ...initialData.alt,
          },
          articles: initialData.articles.map((article) => {
            if (article.type === CONTENT_TYPE.IMAGE) {
              return {
                ...article,
                alt: {
                  ...defaultLocaleString,
                  ...article.alt,
                },
              };
            }
            if (article.type === CONTENT_TYPE.HEADING || article.type === CONTENT_TYPE.PARAGRAPH) {
              return {
                ...article,
                text: {
                  ...defaultLocaleString,
                  ...article.text,
                },
              };
            }
            return article;
          }),
        }
      : {
          slug: 'test12345',
          status: 'draft',
          date: new Date(),
          imageUrl:
            'https://ik.imagekit.io/dabeikeng/Products/5-3_%E8%8C%B6%E9%A2%A8%E5%91%B3%E9%A4%85%E4%B9%BE.jpg',
          newsTags: [],
          articles: [],
          headline: defaultLocaleString,
          description: defaultLocaleString,
          alt: defaultLocaleString,
        },
  });

  const isDeleted = form.watch('isDeleted');

  console.log('newsTags', form.getValues('newsTags'));

  useJumpToErrorInput(form.formState.errors);

  const { fields, update, remove, append } = useFieldArray({
    control: form.control,
    name: 'articles',
  });

  const [items, setItems] = useState<ContentWithId[]>(fields);

  const isMount = useMount();

  const onSubmit = async (data: NewsFormValues) => {
    try {
      if (initialData) {
        await updateNews(initialData.id, data);
      } else {
        await createNews(data);
      }
      toast.success('更新成功');
      router.push(`/dashboard/project/${params.projectId}/news`);
    } catch (error) {
      if (initialData) {
        toast.error('更新失敗');
      } else {
        toast.error('新增失敗');
      }
    }
  };

  const onRollback = async () => {
    try {
      if (!initialData) return;
      await rollbackNews(initialData.id);
      toast.success('復原成功');
      router.push(`/dashboard/project/${params.projectId}/news`);
    } catch (error) {
      toast.error('復原失敗');
    }
  };

  const onCreateContent = async (data: ContentWithId) => {
    append(data);
    setItems([...items, data]);
    onClose();
  };

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center gap-4 py-4 max-md:flex-col'>
          <FormField
            name='date'
            control={form.control}
            render={({ field }) => (
              <FormItem className='relative w-full flex-1'>
                <FormLabel id='date'>發布日期</FormLabel>
                <DatePicker
                  className='flex w-full'
                  selected={field.value}
                  onSelect={field.onChange}
                  buttonDisabled={isDeleted}
                  required
                  withForm
                />
              </FormItem>
            )}
          />
          <FormField
            name='status'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full flex-1'>
                <FormLabel>狀態</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='選擇一個狀態' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <TagSelectField
          control={form.control}
          allNewsTags={allNewsTags}
        />

        <div className='relative py-4'>
          <FormLabel>標題</FormLabel>
          <LocaleFieldList
            name='headline'
            control={form.control}
            disabled={isDeleted}
          >
            {({ name, control, disabled }) => (
              <FormField
                name={name}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </LocaleFieldList>
        </div>

        <div className='relative py-4'>
          <Label className='mb-2 inline-block'>說明</Label>
          <LocaleFieldList
            name='description'
            control={form.control}
            disabled={isDeleted}
          >
            {({ name, control, disabled }) => (
              <FormField
                name={name}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='min-h-40'
                        disabled={disabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </LocaleFieldList>
        </div>

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
            defaultAlt='image'
            disabled={isDeleted}
          />
        </div>
        <div className='relative py-4'>
          <FormLabel className='text-sm'>封面圖片說明</FormLabel>
          <LocaleFieldList
            name='alt'
            control={form.control}
            disabled={isDeleted}
          >
            {({ name, control, disabled }) => (
              <FormField
                name={name}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      disabled={disabled}
                    />
                  </FormItem>
                )}
              />
            )}
          </LocaleFieldList>
        </div>

        <div className=' w-full py-4'>
          <div className='mb-4 flex items-center justify-between'>
            <Label className='text-sm'>內文</Label>
            <AddButton
              onClick={onOpen}
              disabled={isDeleted}
            />
          </div>
          <Modal
            title='新增內文區塊'
            description='請選擇一個區塊類型，並填寫內容'
            isOpen={isOpen}
            onClose={onClose}
          >
            <ContentForm onCreate={onCreateContent} />
          </Modal>
          <ContentList
            items={items}
            setItems={setItems}
            disabled={isDeleted}
            onUpdate={update}
            onDelete={remove}
          />
        </div>
        <div className='col-span-full flex w-full items-center justify-end gap-x-2'>
          {isDeleted ? (
            <Button
              type='button'
              variant='destructive'
              onClick={onRollback}
            >
              復原
            </Button>
          ) : (
            <>
              {initialData ? (
                <DeleteNewsModal
                  data={initialData.id}
                  title='你確定要刪除這筆資料嗎？'
                  description='這筆資料可在 “刪除列表” 中進行復原'
                />
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
            </>
          )}
        </div>
      </form>
    </Form>
  );
};
