import { z } from 'zod';

export const TutorUpdateSchema = z.object({
  nome: z.string().nonempty().optional(),
  telefone: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  sobre: z.string().optional().nullable(),
});

export type TTutorUpdate = z.infer<typeof TutorUpdateSchema>;
