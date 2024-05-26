import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ChevronLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';

import { RouterBackButton } from '@/components/router-back-button';

import { queryClient } from '@/lib/react-query';

import { dynamicImport } from '@/utils/dynamic-import';
import { formatRelative } from '@/utils/format';

import { fetchNewsTags } from '../actions';

import { getNewsBySlug } from './actions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug);
  return {
    title: news?.formattedHeadline ?? '新增 最新消息',
  };
}

const { NewsForm } = dynamicImport(
  () => import(/* webpackChunkName:"NewsForm" */ './_components/news-form'),
  'NewsForm',
  {
    ssr: false,
  }
);

export default async function Page({ params }: { params: { projectId: string; slug: string } }) {
  const news = await getNewsBySlug(params.slug);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['news-tags'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => fetchNewsTags({ page: pageParam }),
  });

  return (
    <div className='relative w-full'>
      <div className='mb-4 flex w-full flex-wrap items-center justify-between gap-4'>
        <div className='inline-flex items-center'>
          <RouterBackButton
            variant='ghost'
            size='icon'
          >
            <ChevronLeftIcon size={20} />
          </RouterBackButton>
          <div className='ml-2'>
            <h2 className='select-none text-lg font-semibold'>
              活動消息 - {news ? '編輯' : '新增'}
            </h2>
          </div>
        </div>
        <div>
          {news ? (
            <span className='select-none text-xs text-foreground/50'>
              上次編輯 {formatRelative(news.updatedAt)}
            </span>
          ) : null}
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsForm initialData={news} />
      </HydrationBoundary>
    </div>
  );
}
