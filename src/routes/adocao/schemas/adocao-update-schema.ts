import { z } from 'zod';

export const AdocaoUpdateSchema = z.object({
  animal: z.number().int().optional(),
  tutor: z.number().int().optional(),
});

export type TAdocaoUpdate = z.infer<typeof AdocaoUpdateSchema>;
