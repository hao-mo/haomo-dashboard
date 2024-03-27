import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, { message: '請輸入專案名稱' }),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
