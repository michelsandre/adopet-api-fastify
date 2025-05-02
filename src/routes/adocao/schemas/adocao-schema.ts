import { z } from 'zod';

export const AdocaoSchema = z.object({
  id: z.string(),
  petId: z.number().int(),
  tutorId: z.number().int(),
  data: z.date(),
});

export type TAdocao = z.infer<typeof AdocaoSchema>;
