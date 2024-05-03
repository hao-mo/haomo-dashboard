import { z } from 'zod';

import { localeSchema } from '@/lib/schemas/locale.schema';
import { contentSchema, fileSchema } from '@/lib/schemas/schema';

export const newsFormSchema = z.object({
  slug: z.string(),
  isDeleted: z.boolean().default(false),
  date: z.date(),
  headline: localeSchema,
  description: localeSchema,
  articles: z.array(contentSchema),
  alt: localeSchema,
  formattedAlt: z.string(),
  imageUrl: z.string(),
  file: fileSchema.optional(),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
