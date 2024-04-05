'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScreenReader } from '@/components/ui/screen-reader';

import { defaultLocaleString, localeString } from '@/lib/locales';

import type { News } from '../../type';

const formSchema = z.object({
  // format is an object of locales key to string
  formattedHeadline: localeString,
  formattedDescription: localeString,
  date: z.date(),
});

type NewsFormValues = z.infer<typeof formSchema>;

export const NewsForm = ({ initialData }: { initialData?: News }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      formattedHeadline: defaultLocaleString,
      formattedDescription: defaultLocaleString,
      date: new Date(),
    },
  });
  console.log('form values', form.getValues());

  const onSubmit = async (data: NewsFormValues) => {};

  const onDelete = async (data: NewsFormValues) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type='multiple'
          defaultValue={['headline', 'description']}
        >
          <AccordionItem value='headline'>
            <div className='flex flex-col py-2 lg:flex-row lg:items-center lg:justify-between'>
              <Label className='shrink-0'>標題</Label>
              <FormField
                control={form.control}
                name='formattedHeadline.zh-TW'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <div className='flex items-center justify-end'>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                      <AccordionTrigger className='pl-2'>
                        <ScreenReader>Toggle</ScreenReader>
                      </AccordionTrigger>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <AccordionContent className='pb-4 pr-6 pt-1'>
              <div className='flex w-full flex-col items-end justify-center gap-y-2'>
                <FormField
                  control={form.control}
                  name='formattedHeadline.en-US'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                      <FormLabel className='shrink-0 text-xs'>英文 / English</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='formattedHeadline.ja-JP'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                      <FormLabel className='shrink-0 text-xs'>日文 / Japanese</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='description'>
            <div className='flex flex-col py-2 lg:flex-row lg:items-center lg:justify-between'>
              <Label className='shrink-0'>說明</Label>
              <FormField
                control={form.control}
                name='formattedDescription.zh-TW'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <div className='flex items-center justify-end'>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                      <AccordionTrigger className='pl-2'>
                        <ScreenReader>Toggle</ScreenReader>
                      </AccordionTrigger>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <AccordionContent className='pb-4 pr-6 pt-1'>
              <div className='flex w-full flex-col items-end justify-center gap-y-2'>
                <FormField
                  control={form.control}
                  name='formattedDescription.en-US'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                      <FormLabel className='shrink-0 text-xs'>英文 / English</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='formattedDescription.ja-JP'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
                      <FormLabel className='shrink-0 text-xs'>日文 / Japanese</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full max-w-lg'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};
