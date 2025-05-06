import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { CustomError } from '../../shared/custom-error';
import { TAbrigoCreate } from './schemas/abrigo-create-schema';
import { TAbrigo } from './schemas/abrigo-schema';
import { TAbrigoUpdate } from './schemas/abrigo-update-schema';

export class AbrigoService implements IService {
  constructor(private prisma: PrismaClient) {}

  private async findById(id: number): Promise<TAbrigo> {
    const abrigo = await this.prisma.abrigo.findUnique({ where: { id } });
    if (!abrigo) throw new CustomError('Abrigo não encontrado', 404);

    return abrigo;
  }

  async getAll(): Promise<TAbrigo[]> {
    return await this.prisma.abrigo.findMany();
  }

  async getById(id: number): Promise<TAbrigo> {
    const abrigo = await this.prisma.abrigo.findUnique({
      where: { id },
      include: {
        pets: true,
      },
    });
    if (!abrigo) throw new CustomError('Abrigo não encontrado', 404);

    return abrigo;
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
