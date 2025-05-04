import { PrismaClient } from '../../../generated/prisma';
import { CustomError } from '../../shared/custom-error';

import { TAbrigo } from '../abrigos/schemas/abrigo-schema';
import { TPet } from '../pets/schemas/pet-schema';
import { TTutor } from '../tutores/schemas/tutor-schema';
import { TAdocao } from './schemas/adocao-schema';

enum Model {
  TUTOR = 'tutor',
  PET = 'pet',
  ADOCAO = 'adocao',
  ABRIGO = 'abrigo',
}

export class AdocaoService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async findById<T>(
    id: number | string,
    model: Model,
    filterParams?: object
  ): Promise<T> {
    const item = await (this.prisma[model] as any).findUnique({
      where: { id },
      include: filterParams,
    });

    if (!item) throw new CustomError(`${model} não encontrado`, 404);

    return item;
  }

  async getAll(): Promise<TAdocao[]> {
    return await this.prisma.adocao.findMany();
  }

  async createAdocao(tutorId: number, petId: number): Promise<TAdocao> {
    const tutor = await this.findById<TTutor>(tutorId, Model.TUTOR);
    const pet = await this.findById<TPet>(petId, Model.PET);

    if (pet.adotado)
      throw new CustomError('Pet não disponível para adoção', 400);

    const [adocaoResponse, _] = await this.prisma.$transaction([
      this.prisma.adocao.create({
        data: {
          petId: pet.id,
          tutorId: tutor.id,
        },
      }),
      this.prisma.pet.update({
        where: { id: petId },
        data: {
          adotado: true,
        },
      }),
    ]);
    return adocaoResponse;
  }

  async delete(id: string, abrigoId: number): Promise<{ message: string }> {
    const adocao = await this.findById<TAdocao>(id, Model.ADOCAO, {
      pet: true,
    });
    const abrigo = await this.findById<TAbrigo>(abrigoId, Model.ABRIGO);

    if (abrigoId !== adocao.pet?.abrigoId)
      throw new CustomError(
        'Abrigo solicitante não é o responsável pelo pet',
        400
      );

    await this.prisma.$transaction([
      this.prisma.adocao.delete({
        where: {
          id: adocao.id,
          pet: {
            abrigoId: abrigo.id,
          },
        },
      }),

      this.prisma.pet.update({
        where: { id: adocao.petId },
        data: {
          adotado: false,
        },
      }),
    ]);

    return { message: `Transação de adoção ${id} apagado com sucesso` };
  }
}
