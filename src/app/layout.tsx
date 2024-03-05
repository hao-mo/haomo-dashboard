import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { inter } from '@/styles/fonts';

import { Providers } from './providers';

import '../styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'HaoMo Dashboard',
    template: '%s | HaoMo Dashboard',
  },
  description: 'HaoMo Dashboard',
  keywords: 'HaoMo Dashboard',
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang='zh-TW'
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <div className='relative flex h-screen min-h-full w-full overflow-hidden'>
            <Sidebar />
            <div className='relative flex max-h-screen flex-1 flex-col overflow-hidden border-l border-border'>
              <Header />
              <main className='flex-1 overflow-y-auto overflow-x-hidden py-10'>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
