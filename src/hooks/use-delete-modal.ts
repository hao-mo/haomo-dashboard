import { create } from 'zustand';

interface UseDeleteModalProps {
  isOpen: boolean;
  loading: boolean;
  onOpen: () => void;
  onClose: () => void;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useDeleteModal = create<UseDeleteModalProps>((set) => ({
  isOpen: false,
  loading: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
}));
