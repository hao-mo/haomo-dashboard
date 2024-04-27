import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from './alert-dialog';

interface AlertModalProps extends PropsWithChildren {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal = ({ title, description, isOpen, onClose, children }: AlertModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};
