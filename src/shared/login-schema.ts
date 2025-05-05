import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

export type TLogin = z.infer<typeof LoginSchema>;
