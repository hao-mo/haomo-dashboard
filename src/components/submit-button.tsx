import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';

export const SubmitButton = ({
  isPending,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { isPending?: boolean }) => {
  return (
    <Button
      type='submit'
      className='gap-x-2'
      {...props}
    >
      {isPending && (
        <Loader2
          className='animate-spin'
          size={16}
        />
      )}
      更新
    </Button>
  );
};
