import { z } from 'zod';

export const AbrigoCreateSchema = z.object({
  nome: z.string(),
});

export type TAbrigoCreate = z.infer<typeof AbrigoCreateSchema>;
