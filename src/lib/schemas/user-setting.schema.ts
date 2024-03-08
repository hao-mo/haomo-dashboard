import { z } from 'zod';

import type { Option } from '@/lib/types';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export const profileSettingFormSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Full name must be at least 2 characters',
  }),
  bio: z.string().max(160, {
    message: 'Bio must be at most 160 characters',
  }),
  avatar_url: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      'Only .jpg, .jpeg, .png and .webp file types are supported'
    ),
  website: z.string().refine((value) => /^(https?):\/\//i.test(value), {
    message: 'Please enter a valid URL',
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
