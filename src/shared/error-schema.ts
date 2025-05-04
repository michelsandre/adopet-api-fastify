import { z } from 'zod';

export const ErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

export type TError = z.infer<typeof ErrorSchema>;
