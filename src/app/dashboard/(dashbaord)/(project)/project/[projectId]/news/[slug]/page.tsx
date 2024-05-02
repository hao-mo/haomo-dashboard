import { ChevronLeftIcon } from 'lucide-react';

import { RouterBackButton } from '@/components/router-back-button';

import { formatRelative } from '@/utils/format';

import { ArchivedButton } from './_components/archived-button';
import { NewsForm } from './_components/news-form';
import { getNewsBySlug } from './actions';

export default async function Page({ params }: { params: { projectId: string; slug: string } }) {
  const news = await getNewsBySlug(params.slug);

  const title = news ? '編輯' : '新增';

  return (
    <div className='relative w-full'>
      <div className='mb-4 flex w-full flex-wrap items-center justify-between'>
        <div className='inline-flex items-center'>
          <RouterBackButton
            variant='ghost'
            size='icon'
          >
            <ChevronLeftIcon size={20} />
          </RouterBackButton>
          <div className='ml-2'>
            <h2 className='text-lg font-semibold'>活動消息 - {title}</h2>
            {news ? (
              <span className='text-xs text-foreground/50'>
                上次編輯時間 {formatRelative(news.updatedAt)}
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <ArchivedButton />
        </div>
      </div>
      <NewsForm initialData={news} />
    </div>
  );
}
