import { z } from 'zod';

export const TutorSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  email: z.string(),
  senha: z.string(),

  telefone: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  sobre: z.string().optional().nullable(),
});

export type ITutor = z.infer<typeof TutorSchema>;
