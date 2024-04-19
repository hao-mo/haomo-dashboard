import { z } from 'zod';

export const localeSchema = z.object({
  default: z.string().min(1),
  'zh-TW': z.string().min(1, '繁體中文 是必填欄位'),
  'en-US': z.string().optional(),
  'ja-JP': z.string().optional(),
});
