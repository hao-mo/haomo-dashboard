import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { contentSchema } from '@/lib/schemas/content.schema';
import type { ContentWithId } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

interface NewsContentCreateFormProps {
  onCreate: (content: ContentWithId) => void;
}

export const NewsCreateContentForm = ({ onCreate }: NewsContentCreateFormProps) => {
  const { control, ...form } = useForm<ContentWithId>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
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
  return (
    <div className='space-y-4 px-4'>
      <FormField
        name='type'
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
      <Button
        type='button'
        onClick={() => {
          onCreate(form.getValues());
        }}
      >
        送出
      </Button>
    </div>
  );
};
