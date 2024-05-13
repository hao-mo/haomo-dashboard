import { z } from 'zod';

import type { ContentFormValues } from '@/lib/schemas/schema';
import { contentSchema, fileSchema, statusSchema, tagSchema } from '@/lib/schemas/schema';

import { localeSchema } from '@/stores/locale-store';

export const newsFormSchema = z.object({
  slug: z.string(),
  status: statusSchema,
  isDeleted: z.boolean().default(false),
  date: z.date(),
  headline: localeSchema,
  description: localeSchema,
  alt: localeSchema,
  imageUrl: z.string(),
  articles: z.array(contentSchema),
  file: fileSchema.optional(),
  newsTags: z.array(tagSchema),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

export type ContentWithId = ContentFormValues & { id: string };
