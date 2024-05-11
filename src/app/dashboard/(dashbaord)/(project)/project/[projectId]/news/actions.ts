'use server';

import { revalidateTag } from 'next/cache';

import { BASE_API_URL } from '@/lib/server';
import type { Tag } from '@/lib/types';

import { fetcher } from '@/utils';

import type { News } from './type';

interface NewsSearchOptions {
  pageSize: string;
  page: string;
  tagIds?: string;
  isDeleted?: string;
}

export async function getAllNews({
  pageSize,
  page,
  isDeleted = 'false',
  tagIds,
}: NewsSearchOptions) {
  try {
    const data = await fetcher<CustomResponse<News>>(`${BASE_API_URL}/v1/news/fetch`, {
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
        newsTagIds: tagIds ? tagIds.split(',') : undefined,
      }),
    });

    return {
      data: data.items.map((item) => ({
        ...item,
        articles: item.articles.flatMap((article) => article.contents),
      })),
      pageCount: Math.ceil(data.pagination.totalCount / Number(data.pagination.pageSize)),
    };
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
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

export const getAllNewsTags = async () => {
  try {
    const result = await fetcher<CustomResponse<Tag>>(`${BASE_API_URL}/v1/news-tags/fetch`, {
      method: 'POST',
      body: JSON.stringify({
        orderBy: 'DESC',
        sortBy: 'updatedAt',
        page: 1,
        //   "pageSize": 1,
        isDeleted: false,
      }),
    });
    return {
      data: result.items,
      pageCount: Math.ceil(result.pagination.totalCount / Number(result.pagination.pageSize)),
    };
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};
