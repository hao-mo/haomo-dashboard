import { useEffect, useRef } from 'react';

interface RefetchTriggerProps extends React.ComponentPropsWithoutRef<'div'> {
  func: (() => Promise<void>) | (() => void);
}

export const RefetchTrigger = ({ func, ...props }: RefetchTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // const inView = useInView(ref);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          func();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [func]);

  // useEffect(() => {
  //   if (inView) func();
  // }, [func, inView]);

  return (
    <div
      ref={ref}
      {...props}
    />
  );
};
