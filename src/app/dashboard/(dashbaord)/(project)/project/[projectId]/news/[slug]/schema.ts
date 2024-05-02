import { z } from 'zod';

import { localeSchema } from '@/lib/schemas/locale.schema';
import { contentSchema } from '@/lib/schemas/schema';

export const newsFormSchema = z.object({
  slug: z.string(),
  isDeleted: z.boolean().default(false),
  date: z.date(),
  headline: localeSchema,
  description: localeSchema,
  imageUrl: z.string(),
  alt: localeSchema,
  formattedAlt: z.string(),
  articles: z.array(contentSchema),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
