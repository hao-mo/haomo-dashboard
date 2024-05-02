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

interface NewsCreateContentFormProps {
  onCreate: (content: ContentWithId) => void;
}

interface NewsUpdateContentFormProps {
  content: ContentWithId;
  onUpdate: (content: ContentWithId) => void;
  onDelete: () => void;
}

type NewsContentFormProps = NewsCreateContentFormProps | NewsUpdateContentFormProps;

export const NewsContentForm = (props: NewsContentFormProps) => {
  console.log('🚨 - props', props);
  const isUpdateMode = 'content' in props;
  console.log('🚨 - isUpdateMode', isUpdateMode);

  const form = useForm<ContentWithId>({
    resolver: zodResolver(contentSchema),
    defaultValues: isUpdateMode
      ? props.content
      : {
          type: CONTENT_TYPE.HEADING,
          text: {
            default: '',
            'zh-TW': '',
            'en-US': '',
            'ja-JP': '',
          },
          formattedText: '',
          // level: 1,
        },
  });

  console.log('type', form.getValues());

  const handleTabChange = (value: string) => {
    const contentType = value as ContentType;

    if (isUpdateMode && props.content.type === contentType) {
      form.reset(props.content);
      return;
    }
    if (contentType === CONTENT_TYPE.IMAGE) {
      form.reset({
        type: CONTENT_TYPE.IMAGE,
        imageUrl: '',
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
          default: '',
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
        formattedText: '',
      });
    } else {
      form.reset({
        type: CONTENT_TYPE.PARAGRAPH,
        text: {
          default: '',
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
        formattedText: '',
      });
    }
  };

  const handleSubmit = () => {
    const values = form.getValues();
    if (isUpdateMode) {
      props.onUpdate(values);
    } else {
      props.onCreate(values);
    }
  };

  return (
    <div className='space-y-4'>
      <Tabs
        className='w-full'
        defaultValue={isUpdateMode ? props.content.type : CONTENT_TYPE.HEADING}
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
              name='text'
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
              name='text'
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
          onClick={handleSubmit}
        >
          {isUpdateMode ? '更新' : '新增'}
        </Button>
      </div>
    </div>
  );
};
