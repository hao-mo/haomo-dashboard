import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { contentSchema } from '@/lib/schemas/schema';
import type { ContentType, ContentWithId } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

import { ImageUploadField } from './image-upload-field';
import { LocaleFieldList } from './locale-field-list';

interface NewsContentCreateFormProps {
  onCreate: (content: ContentWithId) => void;
}

export const NewsCreateContentForm = ({ onCreate }: NewsContentCreateFormProps) => {
  const form = useForm<ContentWithId>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      type: CONTENT_TYPE.HEADING,
      text: {
        content: {
          default: '',
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
        formattedContent: '',
      },
      level: 1,
    },
  });

  const handleTabChange = (value: string) => {
    const contentType = value as ContentType;

    if (contentType === CONTENT_TYPE.IMAGE) {
      form.reset({
        type: CONTENT_TYPE.IMAGE,
        src: '',
        alt: {
          default: '',
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
        formattedAlt: '',
        file: undefined,
      });
    } else if (contentType === CONTENT_TYPE.HEADING) {
      form.reset({
        type: CONTENT_TYPE.HEADING,
        text: {
          content: {
            default: '',
            'zh-TW': '',
            'en-US': '',
            'ja-JP': '',
          },
          formattedContent: '',
        },
        level: 1,
      });
    } else {
      form.reset({
        type: CONTENT_TYPE.PARAGRAPH,
        text: {
          content: {
            default: '',
            'zh-TW': '',
            'en-US': '',
            'ja-JP': '',
          },
          formattedContent: '',
        },
      });
    }
  };

  return (
    <div className='space-y-4'>
      <Tabs
        className='w-full'
        defaultValue={CONTENT_TYPE.HEADING}
        onValueChange={handleTabChange}
      >
        <TabsList className='grid h-fit w-full grid-cols-3'>
          <TabsTrigger value={CONTENT_TYPE.HEADING}>標題</TabsTrigger>
          <TabsTrigger value={CONTENT_TYPE.PARAGRAPH}>文字</TabsTrigger>
          <TabsTrigger value={CONTENT_TYPE.IMAGE}>圖片</TabsTrigger>
        </TabsList>
        <TabsContent value={CONTENT_TYPE.HEADING}>
          <div className='relative'>
            <FormLabel className='text-sm'>標題</FormLabel>
            <LocaleFieldList
              name='text.content'
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
        </TabsContent>
        <TabsContent value={CONTENT_TYPE.PARAGRAPH}>
          <div className='relative'>
            <FormLabel className='text-sm'>內容</FormLabel>
            <LocaleFieldList
              name='text.content'
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
                        className='h-32 w-full rounded-md border border-border p-2'
                      />
                    </FormItem>
                  )}
                />
              )}
            </LocaleFieldList>
          </div>
        </TabsContent>
        <TabsContent value={CONTENT_TYPE.IMAGE}>
          <ImageUploadField form={form} />
          <FormLabel className='text-sm'>說明</FormLabel>
          <div className='relative'>
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
        </TabsContent>
      </Tabs>

      <div className='flex items-center justify-end'>
        <Button
          type='button'
          onClick={() => onCreate(form.getValues())}
        >
          新增
        </Button>
      </div>
    </div>
  );
};
