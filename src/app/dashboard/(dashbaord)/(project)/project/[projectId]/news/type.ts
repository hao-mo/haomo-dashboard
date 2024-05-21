import type { StatusFormValues } from '@/lib/schemas/schema';
import type { Content, Tag } from '@/lib/types';

import type { LocaleString } from '@/stores/locale-store';

export type News = {
  id: string;
  publishAt: Date;
  slug: string;
  headline: LocaleString;
  formattedHeadline: string;
  description: LocaleString;
  alt: LocaleString;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  articles: Content[];
  newsTagIds: string[];
  newsTags: Tag[];
  // TODO: 請阿摸新增此欄位
  status: StatusFormValues;
};
