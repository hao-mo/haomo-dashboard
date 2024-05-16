'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Control } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { DeleteModal } from '@/components/modals/delete-modal';
import { RefetchTrigger } from '@/components/refetch-trigger';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Modal } from '@/components/ui/modal';
import { MultiSelect } from '@/components/ui/multi-select';

import { useModal } from '@/hooks/use-modal';

import type { Option, Tag } from '@/lib/types';

import { useGetNewsTags } from '../../../_lib/get-news-tags';
import { revalidateNewsTags } from '../../../actions';
import type { NewsFormValues } from '../../_lib/schema';
import { deleteNewsTag } from '../../actions';

import { TagAction } from './tag-action';
import { TagForm } from './tag-form';

import { useLocaleStore } from '@/stores/locale-store';

interface TagSelectFieldProps {
  control: Control<NewsFormValues>;
}

export const TagSelectField = ({ control }: TagSelectFieldProps) => {
  const defaultLocale = useLocaleStore((state) => state.locale);

  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
    loading: deleteLoading,
    startLoading: startDeleteLoading,
    stopLoading: stopDeleteLoading,
  } = useModal();

  const { isOpen: isModalOpen, onClose: onModalClose, onOpen: onModalOpen } = useModal();

  const { data, isFetching, hasNextPage, refetch } = useGetNewsTags();
  console.log('🚨 - isFetching', isFetching);

  const { setValue } = useFormContext();

  const [targetTag, setTargetTag] = useState<Tag | null>(null);

  const newsTags = useWatch({
    name: 'newsTags',
    control,
    exact: true,
  });

  const allNewsTags = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const tagOptions = useMemo(
    () =>
      allNewsTags.map((tag) => ({
        name: tag.value[defaultLocale] ?? '',
        value: tag.id,
      })),
    [allNewsTags, defaultLocale]
  );

  const selectedTags = useMemo(
    () =>
      newsTags.map((tag) => ({
        name: tag.value[defaultLocale] ?? '',
        value: tag.id,
      })),
    [newsTags, defaultLocale]
  );

  const onValueChange = useCallback(
    (values: Option[]) => {
      const tags = values.map((value) => ({
        value: {
          ...allNewsTags.find((tag) => tag.id === value.value)?.value,
          [defaultLocale]: value.name,
        },
        id: value.value,
      }));
      setValue('newsTags', tags);
    },
    [allNewsTags, defaultLocale]
  );

  const onEdit = useCallback(
    (option: Option) => {
      setTargetTag(allNewsTags.find((tag) => tag.id === option.value) ?? null);
      onModalOpen();
    },
    [allNewsTags]
  );

  const onDelete = useCallback(
    (option: Option) => {
      setTargetTag(allNewsTags.find((tag) => tag.id === option.value) ?? null);
      onDeleteModalOpen();
    },
    [allNewsTags]
  );

  const onConfirmDelete = useCallback(async () => {
    if (!targetTag) return;
    try {
      await deleteNewsTag(targetTag.id);

      revalidateNewsTags();
      refetch();

      toast.success('刪除成功');
    } catch (error) {
      toast.error('刪除失敗');
      console.log('error', error);
    }
    onDeleteModalClose();
  }, [targetTag]);

  useEffect(() => {
    if (!isModalOpen) setTargetTag(null);
  }, [isModalOpen]);

  return (
    <FormField
      name='newsTags'
      control={control}
      render={() => (
        <FormItem className='relative py-4'>
          <FormLabel>標籤</FormLabel>
          <FormControl>
            <MultiSelect
              loading={isFetching}
              options={tagOptions}
              selected={selectedTags}
              onValueChange={onValueChange}
              emptyAction={
                <div className='text-center'>
                  <p className='mb-2'>查無此標籤</p>
                  <Button onClick={onModalOpen}>新增標籤</Button>
                </div>
              }
              additionalAction={(option) => {
                return (
                  <TagAction
                    option={option}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                );
              }}
              footerAction={hasNextPage && <RefetchTrigger func={refetch} />}
            />
          </FormControl>
          <Modal
            title={targetTag ? '編輯標籤' : '新增標籤'}
            description={targetTag ? '請編輯標籤名稱' : '請新增標籤名稱'}
            isOpen={isModalOpen}
            onClose={onModalClose}
          >
            <TagForm
              initialValue={targetTag}
              onClose={onModalClose}
            />
          </Modal>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={onDeleteModalClose}
            title={`你確定要刪除“${targetTag?.value[defaultLocale]}”標籤嗎？`}
            description='可能會影響多筆資料，請謹慎操作'
            loading={deleteLoading}
            onConfirm={onConfirmDelete}
          />
        </FormItem>
      )}
    />
  );
};
