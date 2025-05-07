import { z } from 'zod';

export const PetCreateSeedSchema = z.object({
  nome: z.string().nonempty(),
  descricao: z.string().nonempty(),
  tamanho: z.enum(['pequeno', 'medio', 'medio_grande', 'grande']),
  idade: z.string().nonempty(),
  endereco: z.string().nonempty(),
  imagem: z.string().url(),
  abrigoId: z.number().int().nullable().optional(),
});

export type TPetCreateSeed = z.infer<typeof PetCreateSeedSchema>;
