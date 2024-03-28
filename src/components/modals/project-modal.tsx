'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { projects } from '@prisma/client';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useProjectModal } from '@/hooks/use-project-modal';

import type { ProjectFormValues } from '@/lib/schemas/project.schema';
import { projectFormSchema } from '@/lib/schemas/project.schema';

import { fetcher, wait } from '@/utils';

import { SubmitButton } from '../submit-button';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Modal } from '../ui/modal';

export const ProjectModal = () => {
  const { isOpen, onClose } = useProjectModal();
  const router = useRouter();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { name: '' },
  });

  const disabled = form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      await wait(1000);
      const response = await fetcher<projects>('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      router.push(`/${response.id}`);

      toast.success('新增成功', {
        description: '專案已建立',
      });
    } catch (error) {
      toast.error('新增失敗', {
        description: '發生一些問題',
      });
    }
  };

  return (
    <Modal
      title='建立新專案'
      description='請輸入專案名稱以建立新專案'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <div className='space-y-2'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>專案名稱</FormLabel>
                      <FormControl>
                        <Input
                          disabled={disabled}
                          placeholder='我的專案'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex w-full items-center justify-end space-x-2 pt-6'>
                  <Button
                    type='button'
                    disabled={disabled}
                    variant='outline'
                    onClick={onClose}
                  >
                    取消
                  </Button>
                  <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    disabled={disabled}
                    type='submit'
                  >
                    {form.formState.isSubmitSuccessful && (
                      <CheckIcon
                        size={16}
                        className='mr-2'
                      />
                    )}
                    新增
                  </SubmitButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
