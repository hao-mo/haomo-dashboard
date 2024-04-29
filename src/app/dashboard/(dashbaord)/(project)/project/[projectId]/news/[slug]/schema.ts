import { z } from 'zod';

import { localeSchema } from '@/lib/schemas/locale.schema';
import { contentSchema } from '@/lib/schemas/schema';

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
