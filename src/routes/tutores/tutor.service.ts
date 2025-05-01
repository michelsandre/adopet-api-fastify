import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { TTutorCreate } from './schemas/tutor-create-schema';
import { TTutor } from './schemas/tutor-schema';
import { TTutorUpdate } from './schemas/tutor-update-schema';

export class TutorService implements IService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async findById(id: number): Promise<TTutor> {
    const user = await this.prisma.tutor.findUnique({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');

    return user;
  }

  async getAll(): Promise<TTutor[]> {
    return await this.prisma.tutor.findMany();
  }
  async getById(id: number): Promise<TTutor> {
    return await this.findById(id);
  }
  async create(data: TTutorCreate): Promise<TTutor> {
    return await this.prisma.tutor.create({ data });
  }
  async update(id: number, data: TTutorUpdate): Promise<TTutor> {
    const user = await this.findById(id);
    return this.prisma.tutor.update({ where: { id: user.id }, data });
  }
  async delete(id: number): Promise<{ message: string }> {
    const user = await this.findById(id);
    await this.prisma.tutor.delete({ where: { id: user.id } });
    return {
      message: `Tutor [id: ${user.id}, nome: ${user.nome}] apagado com sucesso!`,
    };
  }
}
