import { useRouter } from 'next/navigation';

import { useOpen } from '@/hooks/use-open';

import { deleteNews } from '../actions';

export const useDeleteNews = (id: string) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useOpen();

  const onDelete = async () => {
    await deleteNews(id);
  };

  const onSuccess = () => {
    router.refresh();
  };

  return { isOpen, onOpen, onClose, onDelete, onSuccess };
};
