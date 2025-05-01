import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { TAbrigoCreate } from './schemas/abrigo-create-schema';
import { TAbrigo } from './schemas/abrigo-schema';
import { TAbrigoUpdate } from './schemas/abrigo-update-schema';

export class AbrigoService implements IService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async findById(id: number): Promise<TAbrigo> {
    const user = await this.prisma.abrigo.findUnique({ where: { id } });
    if (!user) throw new Error('Abrigo não encontrado');

    return user;
  }

  async getAll(): Promise<TAbrigo[]> {
    return await this.prisma.abrigo.findMany({
      include: {
        pets: true,
      },
    });
  }
  async getById(id: number): Promise<TAbrigo> {
    return await this.findById(id);
  }
  async create(data: TAbrigoCreate): Promise<TAbrigo> {
    return await this.prisma.abrigo.create({ data });
  }
  async update(id: number, data: TAbrigoUpdate): Promise<TAbrigo> {
    const abrigo = await this.findById(id);
    return this.prisma.abrigo.update({ where: { id: abrigo.id }, data });
  }
  async delete(id: number): Promise<{ message: string }> {
    const abrigo = await this.findById(id);
    await this.prisma.abrigo.delete({ where: { id: abrigo.id } });
    return {
      message: `Abrigo [id: ${abrigo.id}, nome: ${abrigo.nome}] apagado com sucesso!`,
    };
  }
}
