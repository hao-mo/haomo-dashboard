import { useState } from 'react';

export const useOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (value: boolean) => setIsOpen(value);

  return { isOpen, onOpen, onClose, onOpenChange };
};
