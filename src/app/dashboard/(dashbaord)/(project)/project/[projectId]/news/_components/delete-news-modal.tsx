import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/delete-button';
import { DeleteModal } from '@/components/modals/delete-modal';

import { useDeleteModal } from '@/hooks/use-delete-modal';

interface DeleteNewsModalProps {
  data: string | string[];
  title: string;
  description: string;
  buttonText?: string;
}

export const DeleteNewsModal = ({
  data,
  title,
  description,
  buttonText = '刪除',
}: DeleteNewsModalProps) => {
  const router = useRouter();

  const { isOpen, onClose, onOpen, loading, startLoading, stopLoading } = useDeleteModal();

  const onConfirm = async () => {
    try {
      startLoading();
      // await deleteNews(data);
      toast.success('刪除成功');
      router.refresh();
    } catch (error) {
      toast.error('刪除失敗');
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <DeleteButton onClick={onOpen}>{buttonText}</DeleteButton>
      <DeleteModal
        title={title}
        description={description}
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </>
  );
};
