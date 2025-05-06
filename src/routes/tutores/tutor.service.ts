import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { CustomError } from '../../shared/custom-error';
import { TTutorCreate } from './schemas/tutor-create-schema';
import { TTutor } from './schemas/tutor-schema';
import { TTutorUpdate } from './schemas/tutor-update-schema';

export class TutorService implements IService {
  constructor(private prisma: PrismaClient) {}

  private async findById(id: number): Promise<TTutor> {
    const user = await this.prisma.tutor.findUnique({ where: { id } });
    if (!user) throw new CustomError('Usuário não encontrado', 404);

    return user;
  }

  async getAll(): Promise<TTutor[]> {
    return await this.prisma.tutor.findMany();
  }
  async getById(id: number): Promise<TTutor> {
    const user = await this.prisma.tutor.findUnique({
      where: { id },
      include: {
        adocoes: {
          omit: {
            data: true,
            id: true,
            petId: true,
            tutorId: true,
          },
          include: {
            pet: true,
          },
        },
      },
    });
    if (!user) throw new CustomError('Usuário não encontrado', 404);
    return user;
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
