'use server';

import { revalidateTag } from 'next/cache';

import { BASE_API_URL } from '@/lib/server';

import { fetcher } from '@/utils';

import type { News } from './type';

export async function getAllNews() {
  const data = await fetcher<CustomResponse<News[]>>(`${BASE_API_URL}/v1/news/fetch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderBy: 'DESC',
      sortBy: 'updatedAt',
      pageSize: 5,
      page: 1,
      isDeleted: false,
    }),
    next: {
      revalidate: 0,
      tags: ['news'],
    },
  });

  return data.items.map((item) => ({
    ...item,
    articles: item.articles.flatMap((article) => article.contents),
  }));
}

export const deleteNews = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/v1/news/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete news');
    }
    revalidateTag('news');
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};
