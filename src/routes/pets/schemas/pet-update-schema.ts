import { z } from 'zod';
import { PetCreateSchema } from './pet-create-schema';

export const PetUpdateSchema = PetCreateSchema.partial();

export type TPetUpdate = z.infer<typeof PetUpdateSchema>;
