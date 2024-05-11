import { z } from 'zod';

import { contentSchema, fileSchema } from '@/lib/schemas/schema';

import { localeSchema } from '@/stores/locale-store';

const tagSchema = z.object({
  value: localeSchema,
  isDeleted: z.boolean().default(false),
});

export const newsFormSchema = z.object({
  slug: z.string(),
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

export type ContentFormValues = z.infer<typeof contentSchema>;

export type ContentWithId = ContentFormValues & { id: string };
