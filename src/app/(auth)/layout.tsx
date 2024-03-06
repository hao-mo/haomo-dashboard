export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='relative flex h-screen min-h-full w-full overflow-hidden'>
      <div className='container flex flex-col items-center justify-center py-12'>{children}</div>
    </div>
  );
}
