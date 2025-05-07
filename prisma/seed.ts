import { PrismaClient } from '../generated/prisma';
import { TutorCreateSchema } from '../src/routes/tutores/schemas/tutor-create-schema';
import { hashPassword } from '../src/utils/hash-password';
import { AbrigoCreateSchema } from '../src/routes/abrigos/schemas/abrigo-create-schema';
import { PetCreateSeedSchema } from '../src/routes/pets/schemas/pet-create-seed-schema';

const prisma = new PrismaClient();

async function main() {
  // Definir os exemplos de dados
  const tutores = [
    {
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      senha: await hashPassword('senha123'),
      telefone: '123456789',
      cidade: 'São Paulo',
      sobre: 'Apaixonado por animais e defensor da adoção responsável.',
    },
    {
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      senha: await hashPassword('senha456'),
      telefone: '987654321',
      cidade: 'Rio de Janeiro',
      sobre: 'Experiente em cuidar de pets e sempre disposto a ajudar.',
    },
    {
      nome: 'Carlos Pereira',
      email: 'carlos.pereira@example.com',
      senha: await hashPassword('senha789'),
      telefone: '456123789',
      cidade: 'Belo Horizonte',
      sobre: 'Amante de gatos e cães, com foco em resgates e adoções.',
    },
    {
      nome: 'Ana Costa',
      email: 'ana.costa@example.com',
      senha: await hashPassword('senha101112'),
      telefone: '321654987',
      cidade: 'Curitiba',
      sobre: 'Voluntário em ONGs de proteção animal e tutor dedicado.',
    },
    {
      nome: 'Pedro Santos',
      email: 'pedro.santos@example.com',
      senha: await hashPassword('senha131415'),
      telefone: '789123456',
      cidade: 'Porto Alegre',
      sobre: 'Especialista em comportamento animal e defensor da adoção.',
    },
  ];

  // Validar os dados com TutorCreateSchema
  for (const tutor of tutores) {
    const validatedTutor = TutorCreateSchema.parse(tutor); // Valida os dados
    await prisma.tutor.create({ data: validatedTutor }); // Insere no banco
  }

  const abrigos = [
    {
      nome: 'Abrigo Esperança',
    },
    {
      nome: 'Lar dos Animais',
    },
    {
      nome: 'Refúgio Pet',
    },
    {
      nome: 'Casa dos Bichos',
    },
    {
      nome: 'Amigos dos Animais',
    },
  ];

  // Validar os dados com AbrigosCreateSchema
  for (const abrigo of abrigos) {
    const validatedAbrigo = AbrigoCreateSchema.parse(abrigo); // Valida os dados
    await prisma.abrigo.create({ data: validatedAbrigo }); // Insere no banco
  }

  const pets = [
    {
      nome: 'Rex',
      descricao: 'Brincalhão e amigável',
      idade: '3 anos',
      endereco: 'Rua dos Animais, 123 - São Paulo',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'medio',
      abrigoId: 1,
    },
    {
      nome: 'Mia',
      descricao: 'Carinhosa e tranquila',
      idade: '2 anos',
      endereco: 'Avenida Pet Lovers, 456 - Rio de Janeiro',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'pequeno',
      abrigoId: 2,
    },
    {
      nome: 'Thor',
      descricao: 'Protetor e leal',
      idade: '4 anos',
      endereco: 'Praça dos Bichos, 789 - Belo Horizonte',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'grande',
      abrigoId: 3,
    },
    {
      nome: 'Luna',
      descricao: 'Curiosa e ativa',
      idade: '1 ano',
      endereco: 'Alameda dos Pets, 101 - Curitiba',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'medio_grande',
      abrigoId: 4,
    },
    {
      nome: 'Max',
      descricao: 'Calmo e obediente',
      idade: '5 meses',
      endereco: 'Estrada dos Amigos, 202 - Porto Alegre',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'pequeno',
      abrigoId: 5,
    },
    {
      nome: 'Bella',
      descricao: 'Amorosa e brincalhona',
      idade: '2 anos',
      endereco: 'Rua Felicidade, 303 - Salvador',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'medio',
      abrigoId: 1,
    },
    {
      nome: 'Charlie',
      descricao: 'Inteligente e energético',
      idade: '3 anos',
      endereco: 'Avenida dos Animais, 404 - Recife',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'grande',
      abrigoId: 2,
    },
    {
      nome: 'Daisy',
      descricao: 'Doce e sociável',
      idade: '1 ano e meio',
      endereco: 'Praça Pet Friendly, 505 - Florianópolis',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'pequeno',
      abrigoId: 3,
    },
    {
      nome: 'Rocky',
      descricao: 'Forte e protetor',
      idade: '5 anos',
      endereco: 'Rua dos Guardiões, 606 - Fortaleza',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'grande',
      abrigoId: 4,
    },
    {
      nome: 'Lola',
      descricao: 'Alegre e cheia de energia',
      idade: '6 meses',
      endereco: 'Alameda dos Filhotes, 707 - Manaus',
      imagem: 'https://picsum.photos/200/300',
      tamanho: 'medio_grande',
      abrigoId: 5,
    },
  ];

  // Validar os dados com PetCreateSchema
  for (const pet of pets) {
    const validatedPet = PetCreateSeedSchema.parse(pet); // Valida os dados
    await prisma.pet.create({ data: validatedPet }); // Insere no banco
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
