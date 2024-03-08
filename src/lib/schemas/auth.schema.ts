import { z } from 'zod';

const emailSchema = z.string().trim().email({
  message: '請輸入有效的電子郵件地址',
});

const passwordSchema = z
  .string()
  .min(8, {
    message: '密碼必須至少有 8 個字元',
  })
  .max(16, {
    message: '密碼最多只能有 16 個字元',
  });

const confirmPasswordSchema = z.string();

export const signInFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .superRefine(({ password }, checkPassComplexity) => {
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialChar = false;

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);

      if (!hasUppercase && /[A-Z]/.test(ch)) hasUppercase = true;
      else if (!hasLowercase && /[a-z]/.test(ch)) hasLowercase = true;
      else if (!hasNumber && !isNaN(+ch)) hasNumber = true;
      else if (!hasSpecialChar && /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch))
        hasSpecialChar = true;

      if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) break;
    }

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      checkPassComplexity.addIssue({
        code: z.ZodIssueCode.custom,
        message: '至少包含一個大寫字母、一個小寫字母、一個數字和一個特殊符號',
        path: ['password'],
      });
    }
  });

export const signUpFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼和確認密碼不一致',
    path: ['confirmPassword'],
  });

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export const resetPasswordFormSchema = z.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export type SignInFieldValues = z.infer<typeof signInFormSchema>;

export type SignUpFieldValues = z.infer<typeof signUpFormSchema>;

export type ForgotPasswordFieldValues = z.infer<typeof forgotPasswordFormSchema>;

export type ResetPasswordFieldValues = z.infer<typeof resetPasswordFormSchema>;
