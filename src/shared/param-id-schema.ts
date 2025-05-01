import { z } from 'zod';

export const ParamIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'somente numeros inteiros' }), //Apenas numeros,
});

export type TParamId = z.infer<typeof ParamIdSchema>;
