import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  website: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  about: z.string().max(100, {
    message: 'About must be less than 100 characters.',
  }),
  avatar: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, `File size must be less than 3MB`)
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  cover_image: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, `File size must be less than 3MB`)
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : false),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export type UserAccountSettingFieldValues = z.infer<typeof formSchema>;
