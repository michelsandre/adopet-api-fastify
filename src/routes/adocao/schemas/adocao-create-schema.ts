import { z } from 'zod';

export const AdocaoCreateSchema = z.object({
  petId: z.number().int(),
  tutorId: z.number().int(),
  data: z.date(),
});

export type TAdocaoCreate = z.infer<typeof AdocaoCreateSchema>;
