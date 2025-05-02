import { z } from 'zod';

export const PetSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  descricao: z.string(),
  adotado: z.boolean(),
  idade: z.string(),
  endereco: z.string(),
  imagem: z.string().url(),
  abrigoId: z.number().int().nullable().optional(),
});

export type TPet = z.infer<typeof PetSchema>;
