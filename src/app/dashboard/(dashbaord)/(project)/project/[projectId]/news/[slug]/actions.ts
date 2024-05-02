import { BASE_API_URL } from '@/lib/server';

import { fetcher } from '@/utils';

import type { FormattedNews, News } from '../type';

export const getNewsBySlug = async (slug: string) => {
  try {
    const data = await fetcher<News>(`${BASE_API_URL}/v1/news/by-slug/${slug}`, {
      method: 'GET',
    });
    const formattedData: FormattedNews = {
      ...data,
      articles: data.articles.flatMap((article) => article.contents),
    };
    return formattedData;
  } catch (error) {
    return null;
  }
};
