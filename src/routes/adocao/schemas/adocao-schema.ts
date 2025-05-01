import { z } from 'zod';

export const AdocaoSchema = z.object({
  id: z.string(),
  animal: z.number().int(),
  tutor: z.number().int(),
  data: z.date(),
});

export type TAdocao = z.infer<typeof AdocaoSchema>;
