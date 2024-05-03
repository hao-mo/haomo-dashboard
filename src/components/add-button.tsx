import { PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

interface AddButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  text?: string;
}

export const AddButton = ({ text = '新增', onClick, ...props }: AddButtonProps) => {
  return (
    <Button
      type='button'
      onClick={onClick}
      {...props}
    >
      <PlusIcon
        className='mr-2'
        size={16}
      />
      <span>{text}</span>
      {props.children}
    </Button>
  );
};
