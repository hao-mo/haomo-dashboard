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

export const userSettingFormSchema = z.object({
  firstName: z.string().trim().min(2, {
    message: '名字必須至少有 2 個字元',
  }),
  lastName: z.string().trim().min(1, {
    message: '姓氏必須至少有 1 個字元',
  }),
  email: z.string().trim().email({
    message: '請輸入有效的電子郵件地址',
  }),
  country: z.string().min(2).max(2),
  address: z.string().trim().max(100, {
    message: '地址最多只能有 100 個字元',
  }),
  website: z.string().trim().url({
    message: '請輸入有效的網址連結',
  }),
  about: z.string().max(100, {
    message: '自我介紹最多只能有 100 個字元',
  }),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, `檔案大小必須小於 3MB`)
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      '只支援 .jpg, .jpeg, .png 和 .webp 格式的檔案'
    ),
  cover_image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, '檔案大小必須小於 3MB')
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      '只支援 .jpg, .jpeg, .png 和 .webp 格式的檔案'
    ),
  email_comment_notification: z.boolean(),
  email_candidate_notification: z.boolean(),
  email_offer_notification: z.boolean(),
  push_notification: z.enum(['all', 'mentions', 'none']),
});

export type UserAccountSettingFieldValues = z.infer<typeof userSettingFormSchema>;
