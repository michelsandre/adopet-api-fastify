import { z } from 'zod';

export const PetUpdateSchema = z.object({
  nome: z.string().optional(),
  descricao: z.string().optional(),
  idade: z.string().optional(),
  endereco: z.string().optional(),
  imagem: z.string().url().optional(),
  abrigoId: z.number().int().optional(),
});

export type TPetUpdate = z.infer<typeof PetUpdateSchema>;
