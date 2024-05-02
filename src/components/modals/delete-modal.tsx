import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMount } from '@/hooks/use-mount';

import { Button } from '../ui/button';
import { Loader } from '../ui/loader';

interface DeleteModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onSuccess?: (() => Promise<void>) | (() => void);
}
export const DeleteModal = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
}: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);

  const isMount = useMount();

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      toast.success('刪除成功');
      onSuccess && (await onSuccess());
    } catch (error) {
      toast.error('刪除失敗');
    } finally {
      onClose();
      setLoading(false);
    }
  };

  if (!isMount) return null;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className='text-balance'>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>取消</AlertDialogCancel>
          <Button
            variant='destructive'
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? <Loader className='mr-2 size-4' /> : <TrashIcon className='mr-2 size-4' />}
            確定
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
