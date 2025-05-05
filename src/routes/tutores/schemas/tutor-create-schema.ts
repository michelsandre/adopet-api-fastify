import { z } from 'zod';

export const TutorCreateSchema = z.object({
  nome: z.string().nonempty(),
  email: z.string().email(),
  senha: z.string().min(6),
  telefone: z.string().optional().nullable().default(''),
  cidade: z.string().optional().nullable().default(''),
  sobre: z.string().optional().nullable().default(''),
});

export type TTutorCreate = z.infer<typeof TutorCreateSchema>;
