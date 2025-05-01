import { z } from 'zod';

export const AdocaoCreateSchema = z.object({
  animal: z.number().int(),
  tutor: z.number().int(),
  data: z.date(),
});

export type TAdocaoCreate = z.infer<typeof AdocaoCreateSchema>;
