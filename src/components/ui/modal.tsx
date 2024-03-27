import { Dialog, DialogContent, DialogDescription, DialogHeader } from './dialog';

interface ModalProps extends PropsWithChildren {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ title, description, isOpen, onClose, children }: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
