import { formatRelative } from '@/utils/format';

import { NewsForm } from './_components/news-form';
import { getNews } from './actions';

export default async function Page({ params }: { params: { projectId: string; newsId: string } }) {
  const news = await getNews(params.newsId);

  const title = news ? '編輯' : '新增';

  return (
    <div className='relative w-full'>
      <div className='mb-8 flex w-full flex-wrap items-center justify-between'>
        <div className=''>
          <h2 className='text-lg font-semibold'>活動消息 - {title}</h2>
          {news ? (
            <span className='text-xs text-foreground/50'>
              上次編輯時間 {formatRelative(news.updatedAt)}
            </span>
          ) : null}
        </div>
      </div>
      <NewsForm initialData={news} />
    </div>
  );
}
