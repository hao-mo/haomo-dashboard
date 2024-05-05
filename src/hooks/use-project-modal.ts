import { create } from 'zustand';

interface UseProjectModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProjectModal = create<UseProjectModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
