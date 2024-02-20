import '../styles/globals.scss';

import type { Metadata } from 'next';

import { inter } from '@/styles/fonts';

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
    <html lang='zh-TW'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
