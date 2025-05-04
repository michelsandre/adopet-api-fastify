import { z } from 'zod';

export const AbrigoCreateSchema = z.object({
  nome: z.string().nonempty(),
});

export type TAbrigoCreate = z.infer<typeof AbrigoCreateSchema>;
