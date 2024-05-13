import { zodResolver } from '@hookform/resolvers/zod';
import { MoreHorizontalIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DeleteModal } from '@/components/modals/delete-modal';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMultiSelectContext } from '@/components/ui/multi-select';

import { useModal } from '@/hooks/use-modal';
import { useOpen } from '@/hooks/use-open';

import { tagSchema } from '@/lib/schemas/schema';
import type { Option } from '@/lib/types';

import { deleteNewsTag } from '../../actions';
import { LocaleFieldList } from '../locale-field-list';

import { defaultLocaleString, type LocaleString } from '@/stores/locale-store';

interface TagActionProps {
  item: Option;
  value?: LocaleString;
}

export const TagAction = ({ item, value }: TagActionProps) => {
  const { isOpen, onOpenChange, onClose } = useOpen();

  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen,
    loading,
    startLoading,
    stopLoading,
  } = useModal();

  const { selected } = useMultiSelectContext();

  const [updating, setUpdating] = useState(false);

  const form = useForm({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      id: item.value,
      value: {
        ...defaultLocaleString,
        ...value,
      },
    },
  });

  const values = form.watch('value');

  const onUpdate = useCallback(async () => {
    try {
      setUpdating(true);
      console.log('🚨 - values', values);
      if (!values) return;

      // await updateNewsTag(item.value, values);
      toast.success('更新成功');
    } catch (error) {
      console.log('error', error);
      toast.error('更新失敗');
    } finally {
      setUpdating(false);
      onClose();
    }
  }, [item.value, values]);

  const onDelete = useCallback(async () => {
    try {
      startLoading();
      await deleteNewsTag(item.value);
      toast.success('刪除成功');
    } catch (error) {
      console.log('error', error);
      toast.error('刪除失敗');
    } finally {
      stopLoading();
      onClose();
      onModalClose();
    }
  }, [item.value]);

  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='hocus-visible:bg-white/80'
          >
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='p-4'
          onClick={(e) => e.stopPropagation()}
          onCloseAutoFocus={(e) => e.stopPropagation()}
        >
          <LocaleFieldList
            name='value'
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
          <div className='mt-4 flex flex-wrap items-center gap-2'>
            <Button
              size='sm'
              variant='destructive'
              className='flex-1'
              onClick={onOpen}
            >
              刪除
            </Button>
            <SubmitButton
              size='sm'
              type='button'
              className='flex-1'
              loading={updating}
              onClick={onUpdate}
            >
              變更
            </SubmitButton>
          </div>
          <DeleteModal
            title='你確定要刪除這個標籤嗎？'
            description='可能會影響多個文章的標籤，且不可復原'
            loading={loading}
            isOpen={isModalOpen}
            onClose={onModalClose}
            onConfirm={onDelete}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
