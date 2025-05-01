import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { ITutorCreate } from './schemas/tutor-create-schema';
import { ITutor } from './schemas/tutor-schema';

export class TutorService implements IService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(): Promise<ITutor[]> {
    return await this.prisma.tutor.findMany();
  }
  async getById(id: number): Promise<ITutor> {
    const user = await this.prisma.tutor.findUnique({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');

    return user;
  }
  async create(data: ITutorCreate): Promise<ITutor> {
    return await this.prisma.tutor.create({ data });
  }
  update(id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
