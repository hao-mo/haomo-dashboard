'use server';

import { revalidateTag } from 'next/cache';

import { BASE_API_URL } from '@/lib/server';

import { fetcher } from '@/utils';

import type { News } from './type';

interface NewsSearchOptions {
  pageSize: string;
  page: string;
  isDeleted?: string;
}

export async function getAllNews({ pageSize, page, isDeleted = 'false' }: NewsSearchOptions) {
  const data = await fetcher<CustomResponse<News[]>>(`${BASE_API_URL}/v1/news/fetch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderBy: 'DESC',
      sortBy: 'updatedAt',
      pageSize: Number(pageSize),
      page: Number(page),
      isDeleted: isDeleted === 'true',
    }),
  });

  return {
    data: data.items.map((item) => ({
      ...item,
      articles: item.articles.flatMap((article) => article.contents),
    })),
    pageCount: Math.ceil(data.pagination.totalCount / Number(data.pagination.pageSize)),
  };
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
