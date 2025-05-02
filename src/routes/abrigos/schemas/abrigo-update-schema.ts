import { z } from 'zod';
import { AbrigoCreateSchema } from './abrigo-create-schema';

export const AbrigoUpdateSchema = AbrigoCreateSchema.partial();

export type TAbrigoUpdate = z.infer<typeof AbrigoUpdateSchema>;
