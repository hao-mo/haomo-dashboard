import { fetcher } from '@/utils';

export const getNews = async () => {
  const result = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/v1/news/fetch`, {
    headers: { 'Content-Type': 'application/json' },
  });
};
