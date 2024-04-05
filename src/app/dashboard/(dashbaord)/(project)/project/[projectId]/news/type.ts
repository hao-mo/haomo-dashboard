export type News = {
  id: string;
  slug: string;
  headline: string;
  // formattedHeadline: LocaleString;
  description: string;
  // formattedDescription: LocaleString;
  imageUrl: string;
  alt: string;
  // formattedAlt: LocaleString;
  date: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  // TODO: 請阿摸新增此欄位
  status: 'draft' | 'processing' | 'published' | 'archived' | 'failed';
};
