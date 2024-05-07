import type { Content } from '@/lib/types';

import type { LocaleString } from '@/stores/locale-store';

interface ArticleContent {
  contents: Content[];
}

export type News = {
  id: string;
  slug: string;
  headline: LocaleString;
  formattedHeadline: string;
  description: LocaleString;
  formattedDescription: string;
  imageUrl: string;
  alt: LocaleString;
  formattedAlt: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  articles: ArticleContent[];
  newsTagIds: string[];
  newsTags: NewsTag[];
  // TODO: 請阿摸新增此欄位
  status: 'draft' | 'processing' | 'published' | 'archived' | 'failed';
  // TODO: 請阿摸新增此欄位
  // date: Date;
};

export type FormattedNews = Omit<News, 'articles'> & { articles: Content[] };

export type NewsTag = {
  id: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  value: LocaleString;
  formattedValue: string;
};
