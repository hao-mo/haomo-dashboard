import { BASE_API_URL } from '@/lib/server';

import { fetcher } from '@/utils';

import type { News } from './type';

export async function getTotalNews() {
  const data = await fetcher<CustomResponse<News[]>>(`${BASE_API_URL}/v1/news/fetch`, {
    method: 'POST',
    body: JSON.stringify({
      orderBy: 'DESC',
      sortBy: 'updatedAt',
      pageSize: 1,
      page: 1,
      isDeleted: false,
    }),
  });
  console.log('🚨 - data', data.items);
  return data.items.map((item) => ({
    ...item,
    articles: item.articles.flatMap((article) => article.contents),
  }));
}
