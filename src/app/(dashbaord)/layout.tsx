import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='relative flex h-screen min-h-full w-full overflow-hidden'>
      <Sidebar />
      <div className='relative flex max-h-screen flex-1 flex-col overflow-hidden border-l border-border'>
        <Header />
        <main className='flex-1 overflow-y-auto overflow-x-hidden py-10'>{children}</main>
      </div>
    </div>
  );
}
