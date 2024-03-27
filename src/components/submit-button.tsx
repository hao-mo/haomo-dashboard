import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';

export const SubmitButton = ({
  isSubmitting,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { isSubmitting?: boolean }) => {
  return (
    <Button
      type='submit'
      {...props}
    >
      {isSubmitting && (
        <Loader2
          className='mr-2 animate-spin'
          size={16}
        />
      )}
      {children}
    </Button>
  );
};
