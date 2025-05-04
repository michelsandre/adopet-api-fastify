import { z } from 'zod';
import { PetSchema } from '../../pets/schemas/pet-schema';

export const AdocaoSchema = z.object({
  id: z.string(),
  petId: z.number().int(),
  tutorId: z.number().int(),
  data: z.date(),
  pet: PetSchema.optional(),
});

export type TAdocao = z.infer<typeof AdocaoSchema>;
