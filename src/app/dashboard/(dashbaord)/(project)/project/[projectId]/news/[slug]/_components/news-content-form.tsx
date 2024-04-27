import { zodResolver } from '@hookform/resolvers/zod';
import { type Control, useForm } from 'react-hook-form';

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { contentSchema } from '@/lib/schemas/content.schema';
import { CONTENT_TYPE, type ContentWithId } from '@/lib/types';

import type { NewsFormValues } from '../schema';

interface ContentFormProps {
  control: Control<NewsFormValues>;
  index: number;
  content?: ContentWithId;
  onUpdate?: (index: number, content: ContentWithId) => void;
  onCreate?: (content: ContentWithId) => void;
  onDelete?: (index: number) => void;
}

export const NewsContentForm = ({
  content,
  // control,
  index,
  onCreate,
  onUpdate,
  onDelete,
}: ContentFormProps) => {
  console.log('🚨 - content', content);

  const { control, getValues } = useForm<ContentWithId>({
    resolver: zodResolver(contentSchema),
    defaultValues: content ?? {
      type: CONTENT_TYPE.HEADING,
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
  });
  console.log('🚨 - content formState', getValues());

  return (
    <div className='space-y-4 px-4'>
      <FormField
        // key={index}
        name={`type`}
        // name={`articles.${index}.type`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm'>類別</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='請選擇一個類別' />
              </SelectTrigger>
              <SelectContent side='bottom'>
                <SelectItem value={CONTENT_TYPE.HEADING}>標題</SelectItem>
                <SelectItem value={CONTENT_TYPE.PARAGRAPH}>文字</SelectItem>
                <SelectItem value={CONTENT_TYPE.IMAGE}>圖片</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      {/* {currentContent.type !== 'image' && (
        <FormField
          name='text.content.default'
          control={control}
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
      )} */}

      <button
        type='button'
        onClick={() => {
          onUpdate?.(index, getValues());
        }}
      >
        Update
      </button>
    </div>
  );
};
