import { PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick}>
      <PlusIcon className='size-4' />
      <span className='ml-2'>新增</span>
    </Button>
  );
};
