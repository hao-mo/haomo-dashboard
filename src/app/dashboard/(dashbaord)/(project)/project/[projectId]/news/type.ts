import type { Content, Tag } from '@/lib/types';

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
  newsTags: Tag[];
  // TODO: 請阿摸新增此欄位
  status: 'draft' | 'processing' | 'published' | 'archived' | 'failed';
  // TODO: 請阿摸新增此欄位
  // date: Date;
};

export type FormattedNews = Omit<News, 'articles'> & { articles: Content[] };
