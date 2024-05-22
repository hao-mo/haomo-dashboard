import { z } from 'zod';

import type { Option } from '@/lib/types';

import { ACCEPTED_FILE_TYPES, completeUrlRegex, httpRegex, MAX_UPLOAD_SIZE } from '../regex';
import { CONTENT_TYPE } from '../types';

import { localeSchema } from '@/stores/locale-store';

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

export const headingSchema = z.object({
  type: z.literal(CONTENT_TYPE.HEADING),
  text: localeSchema,
  // formattedText: z.string(),
  // level: z.union([
  //   z.literal(1),
  //   z.literal(2),
  //   z.literal(3),
  //   z.literal(4),
  //   z.literal(5),
  //   z.literal(6),
  // ]),
});

export const paragraphSchema = z.object({
  type: z.literal(CONTENT_TYPE.PARAGRAPH),
  text: localeSchema,
  // formattedText: z.string(),
});

export const fileSchema = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, 'File size must be less than 3MB')
  .refine(
    (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
    'Only .jpg, .jpeg, .png and .webp file types are supported'
  );

export const imageSchema = z.object({
  type: z.literal(CONTENT_TYPE.IMAGE),
  imageUrl: z.string(),
  alt: localeSchema,
  // formattedAlt: z.string(),
  file: fileSchema.optional(),
});

export const contentSchema = z.union([headingSchema, paragraphSchema, imageSchema]);

export type ContentFormValues = z.infer<typeof contentSchema>;

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: localeSchema,
});

export type TagFormValues = z.infer<typeof tagSchema>;

export const statusSchema = z.enum(['draft', 'published']);

export type StatusFormValues = z.infer<typeof statusSchema>;

export const pushNotificationOptions: Option[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Direct messages and mentions',
    value: 'mentions',
  },
  {
    name: 'Nothing',
    value: 'none',
  },
];

export const accountSettingFormSchema = z.object({
  id: z.string(),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters',
  }),
});

export const profileSettingFormSchema = z.object({
  bio: z.string().max(160, {
    message: 'Bio must be at most 160 characters',
  }),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      'Only .jpg, .jpeg, .png and .webp file types are supported'
    ),
  website: z.string().transform((val, ctx) => {
    let completeUrl = val;
    if (!httpRegex.test(completeUrl)) {
      completeUrl = `https://${completeUrl}`;
    }
    if (!completeUrlRegex.test(completeUrl)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a valid URL',
      });

      return z.NEVER;
    }
    return completeUrl;
  }),
});

export const notificationSettingFormSchema = z.object({
  email_comment_notification: z.boolean(),
  email_candidate_notification: z.boolean(),
  email_offer_notification: z.boolean(),
  push_notification: z.enum(['all', 'mentions', 'none']),
});

export type AccountSettingFieldValues = z.infer<typeof accountSettingFormSchema>;

export type ProfileSettingFieldValues = z.infer<typeof profileSettingFormSchema>;

export type NotificationSettingFieldValues = z.infer<typeof notificationSettingFormSchema>;
