import { z } from 'zod';

export const PetCreateSchema = z.object({
  nome: z.string().nonempty(),
  descricao: z.string().nonempty(),
  idade: z.string().nonempty(),
  endereco: z.string().nonempty(),
  imagem: z.string().url(),
});

export type TPetCreate = z.infer<typeof PetCreateSchema>;
