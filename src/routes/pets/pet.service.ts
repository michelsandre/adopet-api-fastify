import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';

import { TPet } from './schemas/pet-schema';

export class PetService implements IService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async findById(id: number): Promise<TPet> {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) throw new Error('Pet não encontrado');

    return pet;
  }

  async getAll(): Promise<TPet[]> {
    return await this.prisma.pet.findMany();
  }
  async getById(id: number): Promise<TPet> {
    const pet = await this.findById(id);
    return pet;
  }
  create(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number | string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number | string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
