import { z } from 'zod';

export const AbrigoUpdateSchema = z.object({
  nome: z.string().optional(),
});

export type TAbrigoUpdate = z.infer<typeof AbrigoUpdateSchema>;
