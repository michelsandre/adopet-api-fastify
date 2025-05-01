import { z } from 'zod';
import { PetSchema } from '../../pets/schemas/pet-schema';

export const AbrigoSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  pets: PetSchema.array().optional(),
});

export type TAbrigo = z.infer<typeof AbrigoSchema>;
