'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { projects } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { useProjectModal } from '@/hooks/use-project-modal';

import type { ProjectFormValues } from '@/lib/schemas/project.schema';
import { projectFormSchema } from '@/lib/schemas/project.schema';

import { fetcher } from '@/utils';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Modal } from '../ui/modal';
import { toast } from '../ui/use-toast';

export const ProjectModal = () => {
  const { isOpen, onClose } = useProjectModal();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const response = await fetcher<projects>('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log('🚨 - response', response);
      window.location.assign(`/${response.id}`);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'An error occurred',
        variant: 'destructive',
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
                          disabled={form.formState.isSubmitting}
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
                    disabled={form.formState.isSubmitting}
                    variant='outline'
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={form.formState.isSubmitting}
                    type='submit'
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
