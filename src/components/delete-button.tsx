import { Loader2, Trash2Icon } from 'lucide-react';

import { Button } from './ui/button';

export const DeleteButton = ({
  loading,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { loading?: boolean }) => {
  return (
    <Button
      type='button'
      variant='destructive'
      {...props}
    >
      {loading ? (
        <Loader2
          className='mr-2 animate-spin'
          size={16}
        />
      ) : (
        <Trash2Icon
          className='mr-2'
          size={16}
        />
      )}
      {children}
    </Button>
  );
};
