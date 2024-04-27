import { z } from 'zod';

import { CONTENT_TYPE } from '../types';

import { localeSchema } from './locale.schema';

const textSchema = z.object({
  content: localeSchema,
  formattedContent: z.string(),
  style: z
    .object({
      bold: z.boolean().optional(),
      italic: z.boolean().optional(),
      underline: z.boolean().optional(),
      link: z
        .object({
          href: z.string(),
          text: localeSchema,
          formattedText: z.string(),
        })
        .optional(),
    })
    .optional(),
});

const headingSchema = z.object({
  type: z.literal(CONTENT_TYPE.HEADING),
  text: textSchema,
  level: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
});

const paragraphSchema = z.object({
  type: z.literal(CONTENT_TYPE.PARAGRAPH),
  text: textSchema,
});

const imageSchema = z.object({
  type: z.literal(CONTENT_TYPE.IMAGE),
  src: z.string(),
  alt: localeSchema,
  formattedAlt: z.string(),
});

// const listItemSchema = z.object({
//   text: textSchema,
//   subList: z.lazy(() => listSchema).optional(),
// });

// const listSchema = z.object({
//   type: z.literal('list'),
//   listType: z.enum(['ordered', 'unordered']),
//   items: z.array(listItemSchema),
// });

export const contentSchema = z.union([headingSchema, paragraphSchema, imageSchema]);
