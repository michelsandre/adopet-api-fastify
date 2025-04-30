import { z } from 'zod';

export const tutorCreateSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),

  telefone: z.string().optional(),
  cidade: z.string().optional(),
  sobre: z.string().optional(),
});

export type ITutorCreate = z.infer<typeof tutorCreateSchema>;
