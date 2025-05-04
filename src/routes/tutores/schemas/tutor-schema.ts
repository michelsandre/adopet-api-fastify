import { z } from 'zod';
import { AdocaoSchema } from '../../adocao/schemas/adocao-schema';

export const TutorSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  email: z.string(),
  senha: z.string(),

  telefone: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  sobre: z.string().optional().nullable(),
  adocoes: AdocaoSchema.omit({
    data: true,
    id: true,
    petId: true,
    tutorId: true,
  })
    .array()
    .optional(),
});

export type TTutor = z.infer<typeof TutorSchema>;
