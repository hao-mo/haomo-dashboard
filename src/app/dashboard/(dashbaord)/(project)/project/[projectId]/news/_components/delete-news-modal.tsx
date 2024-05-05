import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/delete-button';
import { DeleteModal } from '@/components/modals/delete-modal';

import { useDeleteModal } from '@/hooks/use-delete-modal';

import { deleteNews } from '../actions';

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
  const params = useParams();

  const { isOpen, onClose, onOpen, loading, startLoading, stopLoading } = useDeleteModal();

  const onConfirm = async () => {
    try {
      startLoading();
      if (Array.isArray(data)) {
        toast.success('刪除成功');
        router.refresh();
      } else {
        await deleteNews(data);
        toast.success('刪除成功');
        router.push(`/dashboard/project/${params.projectId}/news`);
      }
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
