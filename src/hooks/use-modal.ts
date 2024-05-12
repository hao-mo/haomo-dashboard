import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    isOpen,
    loading,
    onOpen,
    onClose,
    startLoading,
    stopLoading,
  };
};
