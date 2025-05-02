import { z } from 'zod';

export const AdocaoUpdateSchema = z.object({
  petId: z.number().int().optional(),
  tutorId: z.number().int().optional(),
});

export type TAdocaoUpdate = z.infer<typeof AdocaoUpdateSchema>;
