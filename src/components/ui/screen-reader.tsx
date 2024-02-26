export const ScreenReader = ({ children }: PropsWithChildren) => {
  return <span className='sr-only'>{children}</span>;
};
