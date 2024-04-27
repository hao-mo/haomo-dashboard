import { z } from 'zod';

import { contentSchema } from '@/lib/schemas/content.schema';
import { localeSchema } from '@/lib/schemas/locale.schema';

// const articleSchema = z.object({
//   contents: z.array(contentSchema),
// });
export const newsFormSchema = z.object({
  // format is an object of locales key to string
  headline: localeSchema,
  description: localeSchema,
  date: z.date(),
  articles: z.array(contentSchema),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
