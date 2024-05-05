'use server';

import { revalidateTag } from 'next/cache';

import { BASE_API_URL } from '@/lib/server';
import { CONTENT_TYPE } from '@/lib/types';

import { fetcher } from '@/utils';
import { formatLocaleString } from '@/utils/format';

import type { FormattedNews, News } from '../type';

import type { NewsFormValues } from './schema';

export const createNews = async (data: NewsFormValues) => {
  try {
    const formattedData = {
      ...data,
      status: 'published',
      headline: formatLocaleString(data.headline),
      description: formatLocaleString(data.description),
      alt: formatLocaleString(data.alt),
      articles: [
        {
          contents: [
            ...data.articles.map((article) => {
              if (article.type === CONTENT_TYPE.IMAGE) {
                return {
                  ...article,
                  alt: formatLocaleString(article.alt),
                };
              }
              if (
                article.type === CONTENT_TYPE.HEADING ||
                article.type === CONTENT_TYPE.PARAGRAPH
              ) {
                return {
                  ...article,
                  text: formatLocaleString(article.text),
                };
              }
              return article;
            }),
          ],
        },
      ],
    };
    const response = await fetch(`${BASE_API_URL}/v1/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    if (!response.ok) {
      throw new Error('Failed to create news');
    }
    revalidateTag('news');
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

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

export const updateNews = async (id: string, { date, file, ...data }: NewsFormValues) => {
  try {
    const formattedData = {
      ...data,
      headline: formatLocaleString(data.headline),
      description: formatLocaleString(data.description),
      alt: formatLocaleString(data.alt),
      articles: [
        {
          contents: [
            ...data.articles.map((article) => {
              if (article.type === CONTENT_TYPE.IMAGE) {
                return {
                  ...article,
                  alt: formatLocaleString(article.alt),
                };
              }
              if (
                article.type === CONTENT_TYPE.HEADING ||
                article.type === CONTENT_TYPE.PARAGRAPH
              ) {
                return {
                  ...article,
                  text: formatLocaleString(article.text),
                };
              }
              return article;
            }),
          ],
        },
      ],
    };
    const response = await fetch(`${BASE_API_URL}/v1/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update news');
    }
    revalidateTag('news');
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

export const rollbackNews = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/v1/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDeleted: false,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to rollback news');
    }
    revalidateTag('news');
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};
