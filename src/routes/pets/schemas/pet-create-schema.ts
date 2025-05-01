import { z } from 'zod';

export const PetCreateSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  idade: z.string(),
  endereco: z.string(),
  imagem: z.string().url(),
});

export type TPetCreate = z.infer<typeof PetCreateSchema>;
