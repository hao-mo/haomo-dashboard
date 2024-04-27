import { PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

interface AddButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  text?: string;
}

export const AddButton = ({ text = '新增', onClick, ...props }: AddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      {...props}
    >
      <PlusIcon className='size-4' />
      <span className='ml-2'>{text}</span>
      {props.children}
    </Button>
  );
};
