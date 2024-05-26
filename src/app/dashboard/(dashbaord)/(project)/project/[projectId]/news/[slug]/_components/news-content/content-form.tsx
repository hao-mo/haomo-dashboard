import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AddButton } from '@/components/add-button';
import { DeleteButton } from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { contentSchema } from '@/lib/schemas/schema';
import type { ContentType } from '@/lib/types';
import { CONTENT_TYPE } from '@/lib/types';

import { ImageUploadField } from '../../../../../../../../../../components/image-upload-field';
import { LocaleField } from '../../../../../../../../../../components/locale-field';
import type { ContentWithId } from '../../_lib/schema';

import { defaultLocaleString } from '@/stores/locale-store';

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
          text: defaultLocaleString,
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
        alt: defaultLocaleString,
        file: undefined,
      });
    } else if (contentType === CONTENT_TYPE.HEADING) {
      form.reset({
        type: CONTENT_TYPE.HEADING,
        text: defaultLocaleString,
      });
    } else {
      form.reset({
        type: CONTENT_TYPE.PARAGRAPH,
        text: defaultLocaleString,
      });
    }
  };

  const renderContent = (type: ContentType) => {
    if (type === CONTENT_TYPE.HEADING) {
      return (
        <div className='relative'>
          <Label className='text-sm'>標題</Label>
          <LocaleField
            type='text'
            name='text'
            control={form.control}
          />
        </div>
      );
    }
    if (type === CONTENT_TYPE.PARAGRAPH) {
      return (
        <div className='relative'>
          <Label className='text-sm'>內容</Label>
          <LocaleField
            type='textarea'
            name='text'
            control={form.control}
            className='h-32'
          />
        </div>
      );
    }
    if (type === CONTENT_TYPE.IMAGE) {
      const file = form.getValues('file');
      const imageUrl = file ? URL.createObjectURL(file) : form.getValues('imageUrl');
      const alt = file?.name ?? 'image';
      return (
        <>
          <ImageUploadField
            name='file'
            control={form.control}
            defaultImageUrl={imageUrl}
            defaultAlt={alt}
          />
          <Label className='text-sm'>說明</Label>
          <div className='relative'>
            <LocaleField
              type='text'
              name='alt'
              control={form.control}
            />
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
            tabIndex={-1}
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
