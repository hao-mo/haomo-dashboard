import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { inter } from '@/styles/fonts';
import { getURL } from '@/utils/helpers';

import { Providers } from './providers';

import '../styles/globals.scss';

const meta = {
  title: 'HaoMo Dashboard',
  description: 'Content management system for HaoMo',
  cardImage: '/og.webp',
  robots: 'follow, index',
  favicon: '/icon.ico',
  url: getURL(),
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: meta.title,
      template: `%s | ${meta.title}`,
    },
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Dashboard', 'HaoMo'],
    authors: [{ name: 'HaoMo', url: 'https://vercel.com/' }],
    creator: 'HaoMo',
    publisher: 'HaoMo',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@HarryChen824',
      creator: '@HarryChen824',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
  };
}

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
