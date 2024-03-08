import { MotionBox } from '@/components/motion-box';
import { fadeIn } from '@/lib/transitions';

export default function Template({ children }: PropsWithChildren) {
  return (
    <MotionBox
      className='mx-auto flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-16 xl:px-24 2xl:px-32'
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
