import { z } from 'zod';

export const tutorSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  email: z.string(),
  senha: z.string(),

  telefone: z.string().optional(),
  cidade: z.string().optional(),
  sobre: z.string().optional(),
});

export type ITutor = z.infer<typeof tutorSchema>;
