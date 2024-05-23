'use server';

import type { TagFormValues } from '@/lib/schemas/schema';
import { BASE_API_URL } from '@/lib/server';
import { CONTENT_TYPE } from '@/lib/types';

import { fetcher } from '@/utils';
import { formatLocaleString } from '@/utils/format';

import type { News } from '../type';

import type { NewsFormValues } from './_lib/schema';

/**
 * Creates a news article.
 * @param data - The data for the news article.
 * @returns A Promise that resolves when the news article is created.
 * @throws If there is an error creating the news article.
 */
export const createNews = async ({ file, status, ...data }: NewsFormValues) => {
  try {
    const formattedData = {
      ...data,
      headline: formatLocaleString(data.headline),
      description: formatLocaleString(data.description),
      alt: formatLocaleString(data.alt),
      articles: [
        ...data.articles.map((article) => {
          if (article.type === CONTENT_TYPE.IMAGE) {
            return {
              ...article,
              alt: formatLocaleString(article.alt),
            };
          }
          if (article.type === CONTENT_TYPE.HEADING || article.type === CONTENT_TYPE.PARAGRAPH) {
            return {
              ...article,
              text: formatLocaleString(article.text),
            };
          }
          return article;
        }),
      ],
      newsTagIds: data.newsTags.map((tag) => tag.id),
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
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

/**
 * Retrieves news data by slug.
 * @param slug - The slug of the news.
 * @returns The formatted news data.
 */
export const getNewsBySlug = async (slug: string) => {
  try {
    const data = await fetcher<News>(`${BASE_API_URL}/v1/news/by-slug/${slug}`, {
      method: 'GET',
    });

    return data;
  } catch (error) {
    console.log('🚨 - error', error);
    return null;
  }
};

/**
 * Updates a news item.
 * @param id - The ID of the news item.
 * @param data - The updated news data.
 */
export const updateNews = async (id: string, data: Omit<NewsFormValues, 'file'>) => {
  console.log('🚨 - data', data);
  try {
    const formattedData = {
      ...data,
      headline: formatLocaleString(data.headline),
      description: formatLocaleString(data.description),
      alt: formatLocaleString(data.alt),
      articles: [
        ...data.articles.map((article) => {
          if (article.type === CONTENT_TYPE.IMAGE) {
            return {
              ...article,
              alt: formatLocaleString(article.alt),
            };
          }
          if (article.type === CONTENT_TYPE.HEADING || article.type === CONTENT_TYPE.PARAGRAPH) {
            return {
              ...article,
              text: formatLocaleString(article.text),
            };
          }
          return article;
        }),
      ],
      newsTagIds: data.newsTags.map((tag) => tag.id),
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
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

/**
 * Rollbacks a news item by updating its `isDeleted` property to `false`.
 * @param id - The ID of the news item to rollback.
 * @throws If the rollback operation fails.
 */
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
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

export const createNewsTag = async ({ value, ...data }: TagFormValues) => {
  try {
    const response = await fetch(`${BASE_API_URL}/v1/news-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, value: formatLocaleString(value) }),
    });
    if (!response.ok) {
      throw new Error('Failed to create news tag');
    }
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

/**
 * Updates the tag of a news item.
 * @param id - The ID of the news tag.
 * @param value - The new tag value.
 * @throws If the update fails.
 */
export const updateNewsTag = async ({ id, value, ...data }: TagFormValues) => {
  try {
    const response = await fetch(`${BASE_API_URL}/v1/news-tags/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        value: formatLocaleString(value),
      }),
    });
    console.log('🚨 - response', response);
    if (!response.ok) {
      throw new Error('Failed to update news tag');
    }
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};

/**
 * Deletes a news tag by its ID.
 * @param id - The ID of the news tag to delete.
 * @throws If the deletion fails or an error occurs during the process.
 */
export const deleteNewsTag = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/v1/news-tags/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete news tag');
    }
  } catch (error) {
    console.log('🚨 - error', error);
    throw error;
  }
};
