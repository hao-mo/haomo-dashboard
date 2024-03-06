import { MotionBox } from '@/components/motion-box';
import { fadeIn } from '@/lib/transitions';

export default function Template({ children }: PropsWithChildren) {
  return (
    <MotionBox
      className='mx-auto px-4 sm:px-6 lg:px-8'
      initial='hidden'
      animate='show'
      exit='hidden'
      variants={fadeIn}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </MotionBox>
  );
}
