'use client';

import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DeleteModal } from '@/components/modals/delete-modal';
import { Button } from '@/components/ui/button';
import { useOpen } from '@/hooks/use-open';

export const ArchivedButton = () => {
  const { isOpen, onOpen, onClose } = useOpen();
  const router = useRouter();

  const onConfirm = async () => {
    // await fetcher(`/api/${params.projectId}/news/${data.id}`, {
    //   method: 'DELETE',
    // });
  };

  return (
    <>
      <Button
        variant='destructive'
        onClick={onOpen}
      >
        <TrashIcon className='mr-2 size-4' />
        刪除
      </Button>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        title='你確定要刪除這筆資料嗎？'
        description='此資料可在 “刪除列表” 中進行復原'
        onConfirm={onConfirm}
        onSuccess={() => router.push('/dashboard')}
      />
    </>
  );
};
