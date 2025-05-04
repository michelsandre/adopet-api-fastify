import { PrismaClient } from '../../../generated/prisma';
import { IRelation } from '../../interfaces/relation.inteface';
import { IService } from '../../interfaces/service.interface';
import { CustomError } from '../../shared/custom-error';
import { TAbrigo } from '../abrigos/schemas/abrigo-schema';
import { TPetCreate } from './schemas/pet-create-schema';

import { TPet } from './schemas/pet-schema';
import { TPetUpdate } from './schemas/pet-update-schema';

enum Model {
  PET = 'pet',
  ABRIGO = 'abrigo',
}

export class PetService implements IService, IRelation {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async findById<T>(id: number, model: Model = Model.PET): Promise<T> {
    const item = await (this.prisma[model] as any).findUnique({
      where: { id },
    });
    if (!item) throw new CustomError(`${model} não encontrado`, 404);

    return item;
  }

  async getAll(all: boolean = false): Promise<object[]> {
    const filterParams = {
      where: {
        adotado: false,
        abrigoId: { not: null },
      },
    };
    return await this.prisma.pet.findMany(all ? undefined : filterParams);
  }
  async getById(id: number): Promise<TPet> {
    const pet = await this.findById<TPet>(id);

    return pet;
  }
  async create(data: TPetCreate): Promise<TPet> {
    return await this.prisma.pet.create({ data });
  }

  async update(id: number, data: TPetUpdate): Promise<TPet> {
    const pet = await this.findById<TPet>(id);
    return this.prisma.pet.update({ where: { id: pet.id }, data });
  }
  async delete(id: number): Promise<{ message: string }> {
    const pet = await this.findById<TPet>(id);
    await this.prisma.pet.delete({ where: { id } });
    return {
      message: `Pet [id: ${pet.id}, nome: ${pet.nome}] apagado com sucesso!`,
    };
  }

  async createRelation(petId: number, abrigoId: number): Promise<TPet> {
    const abrigo = await this.findById<TAbrigo>(abrigoId, Model.ABRIGO);
    const pet = await this.findById<TPet>(petId);

    return await this.prisma.pet.update({
      where: {
        id: pet.id,
      },
      data: {
        abrigoId: abrigo.id,
      },
    });
  }
}
