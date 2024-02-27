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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='zh-TW'
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <div
            className='relative flex h-screen overflow-hidden'
            id='body'
          >
            <Sidebar />
            <div className='relative flex max-h-screen flex-1 flex-col overflow-hidden'>
              <Header />
              <main className='overflow-y-auto overflow-x-hidden py-10'>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
