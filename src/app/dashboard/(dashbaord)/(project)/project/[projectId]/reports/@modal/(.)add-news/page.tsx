'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Modal } from '@/components/ui/modal';

export default function AddNewsModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Modal
      title='新增'
      description='建立一則最新消息'
      isOpen={open}
      onClose={onClose}
    >
      AddBlogModal
    </Modal>
  );
}
