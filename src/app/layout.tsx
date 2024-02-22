import type { Metadata } from 'next';

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
          <div className='relative flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden border-l'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
