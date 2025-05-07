import { z } from 'zod';
import { PetSchema } from './pet-schema';

export const PetPaginationSchema = z.object({
  pets: PetSchema.array(),
  records: z.number().int().optional(),
  numPages: z.number().int().optional(),
});

export type TPetPagination = z.infer<typeof PetPaginationSchema>;
