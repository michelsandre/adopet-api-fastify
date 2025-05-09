import { z } from 'zod';

export const PetCreateSchema = z.object({
  nome: z.string().nonempty(),
  descricao: z.string().nonempty(),
  tamanho: z.enum(['pequeno', 'medio', 'medio_grande', 'grande']),
  idade: z.string().nonempty(),
  endereco: z.string().nonempty(),
  imagem: z.string().url(),
});

export type TPetCreate = z.infer<typeof PetCreateSchema>;
