import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { contentSchema } from '@/lib/schemas/content.schema';
import type { ContentWithId } from '@/lib/types';

import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface ContentFormProps {
  content: ContentWithId | null;
  onUpdate?: (content: ContentWithId) => void;
  onCreate?: (content: ContentWithId) => void;
}

type ContentFormValues = z.infer<typeof contentSchema>;

export const ContentForm = ({ content, onUpdate, onCreate }: ContentFormProps) => {
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: content || {
      type: 'paragraph',
      text: {
        content: {
          default: '',
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
      },
    },
  });

  const type = form.watch('type');

  const onSubmit = (values: ContentFormValues) => {
    if (content) {
      onUpdate?.({ ...content, ...values });
    } else {
      onCreate?.({ ...values, id: nanoid() });
    }
  };

  useEffect(() => {
    if (!content) return;
    form.reset(content);
  }, [content]);

  return (
    <div className='px-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <FormField
            name='type'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm'>類別</FormLabel>
                <Select
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='w-40'>
                    <SelectValue placeholder='請選擇一個類別' />
                  </SelectTrigger>
                  <SelectContent side='bottom'>
                    <SelectItem value='heading'>標題</SelectItem>
                    <SelectItem value='paragraph'>文字</SelectItem>
                    <SelectItem value='image'>圖片</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {type !== 'image' && (
            <FormField
              name='text.content.default'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>內容</FormLabel>
                  <Textarea
                    {...field}
                    className='h-32 w-full rounded-md border border-border p-2'
                  />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>

      <button
        type='button'
        onClick={() => {}}
      >
        Update
      </button>
    </div>
  );
};
