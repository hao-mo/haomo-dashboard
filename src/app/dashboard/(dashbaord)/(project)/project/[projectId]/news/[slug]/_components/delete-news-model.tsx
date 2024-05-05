import { DeleteButton } from '@/components/delete-button';
import { DeleteModal } from '@/components/modals/delete-modal';

import { useDeleteNews } from '../../hooks/use-delete-news';

export const DeleteNewsModel = ({ id }: { id: string }) => {
  const { isOpen, onClose, onOpen, onDelete, onSuccess } = useDeleteNews(id);

  return (
    <>
      <DeleteButton onClick={onOpen}>刪除</DeleteButton>
      <DeleteModal
        title='你確定要刪除這筆資料嗎？'
        description='這筆資料可在 “刪除列表” 中進行復原'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
        onSuccess={onSuccess}
      />
    </>
  );
};
