import { z } from 'zod';

export const PetSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  descricao: z.string(),
  tamanho: z.enum(['pequeno', 'medio', 'medio_grande', 'grande']),
  idade: z.string(),
  endereco: z.string(),
  imagem: z.string().url(),
  adotado: z.boolean(),
  abrigoId: z.number().int().nullable().optional(),
});

export type TPet = z.infer<typeof PetSchema>;
