import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchNewsTags } from '../actions';

export const useGetNewsTags = () => {
  return useInfiniteQuery({
    queryKey: ['news-tags'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => fetchNewsTags({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pageCount > allPages.length ? allPages.length + 1 : undefined;
    },
  });
};
