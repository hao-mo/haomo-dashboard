'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/transitions';

const MotionButton = m(Button);

export const SettingFooter = () => {
  const { formState, reset } = useFormContext();

  return (
    <div className='mt-6 flex w-full items-center justify-end gap-x-6 '>
      <AnimatePresence mode='wait'>
        {formState.isDirty && (
          <MotionButton
            type='button'
            variant='ghost'
            onClick={() => reset()}
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={fadeIn}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            取消
          </MotionButton>
        )}
      </AnimatePresence>
      <Button
        type='submit'
        disabled={!formState.isDirty}
      >
        更新
      </Button>
    </div>
  );
};
