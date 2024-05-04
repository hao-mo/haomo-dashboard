import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AddButton } from '@/components/add-button';
import { DeleteButton } from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { contentSchema } from '@/lib/schemas/schema';
import type { ContentType, ContentWithId } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

import { ImageUploadField } from '../image-upload-field';
import { LocaleFieldList } from '../locale-field-list';

interface ContentTab {
  value: ContentType;
  label: string;
}

const tabList: ContentTab[] = [
  {
    value: CONTENT_TYPE.HEADING,
    label: '標題',
  },
  {
    value: CONTENT_TYPE.PARAGRAPH,
    label: '文字',
  },
  {
    value: CONTENT_TYPE.IMAGE,
    label: '圖片',
  },
];

interface NewsCreateContentFormProps {
  onCreate: (content: ContentWithId) => void;
}

interface NewsUpdateContentFormProps {
  content: ContentWithId;
  onUpdate: (content: ContentWithId) => void;
  onDelete: () => void;
}

type ContentFormProps = NewsCreateContentFormProps | NewsUpdateContentFormProps;

export const ContentForm = (props: ContentFormProps) => {
  const isUpdateMode = 'content' in props;

  const [tabValue, setTabValue] = useState<ContentType>(
    isUpdateMode ? props.content.type : CONTENT_TYPE.HEADING
  );

  const form = useForm<ContentWithId>({
    resolver: zodResolver(contentSchema),
    defaultValues: isUpdateMode
      ? props.content
      : {
          type: CONTENT_TYPE.HEADING,
          text: {
            'zh-TW': '',
            'en-US': '',
            'ja-JP': '',
          },
          formattedText: '',
        },
  });

  const handleTabChange = (value: string) => {
    const contentType = value as ContentType;

    setTabValue(contentType);

    if (isUpdateMode && props.content.type === contentType) {
      form.reset(props.content);
      return;
    }
    if (contentType === CONTENT_TYPE.IMAGE) {
      form.reset({
        type: CONTENT_TYPE.IMAGE,
        imageUrl: '',
        alt: {
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
          'zh-TW': '',
          'en-US': '',
          'ja-JP': '',
        },
        formattedText: '',
      });
    }
  };

  const renderContent = (type: ContentType) => {
    if (type === CONTENT_TYPE.HEADING) {
      return (
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
      );
    }
    if (type === CONTENT_TYPE.PARAGRAPH) {
      return (
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
      );
    }
    if (type === CONTENT_TYPE.IMAGE) {
      const file = form.getValues('file');
      const imageUrl = file ? URL.createObjectURL(file) : form.getValues('imageUrl');
      const alt = form.getValues('formattedAlt');
      return (
        <>
          <ImageUploadField
            name='file'
            control={form.control}
            defaultImageUrl={imageUrl}
            defaultAlt={alt}
          />
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
        </>
      );
    }
  };

  return (
    <div className='space-y-4'>
      <Tabs
        className='w-full'
        defaultValue={tabValue}
        value={tabValue}
        onValueChange={handleTabChange}
      >
        <TabsList className='grid h-fit w-full grid-cols-3'>
          {tabList.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabList.map(({ value }) => (
          <TabsContent
            key={value}
            value={value}
          >
            {renderContent(value)}
          </TabsContent>
        ))}
      </Tabs>

      <div className='flex w-full items-center justify-end gap-x-2'>
        {isUpdateMode && (
          <DeleteButton
            className='mr-auto'
            onClick={props.onDelete}
          >
            刪除
          </DeleteButton>
        )}

        {isUpdateMode ? (
          <Button
            type='button'
            disabled={!form.formState.isDirty}
            onClick={() => props.onUpdate(form.getValues())}
          >
            <CheckIcon
              className='mr-2'
              size={16}
            />
            更新
          </Button>
        ) : (
          <AddButton
            disabled={!form.formState.isDirty}
            onClick={() => props.onCreate(form.getValues())}
          />
        )}
      </div>
    </div>
  );
};
