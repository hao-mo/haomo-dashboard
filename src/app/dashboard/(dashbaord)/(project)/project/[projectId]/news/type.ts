export type News = {
  id: string;
  slug: string;
  headline: string;
  formattedHeadline: string;
  description: string;
  formattedDescription: string;
  imageUrl: string;
  alt: string;
  formattedAlt: string;
  date: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  // TODO: 請阿摸新增此欄位
  status: 'draft' | 'processing' | 'published' | 'archived' | 'failed';
};
