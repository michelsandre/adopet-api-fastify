import { FastifyInstance } from 'fastify';
import { PrismaClient } from '../../../generated/prisma';
import { IService } from '../../interfaces/service.interface';
import { CustomError } from '../../shared/custom-error';
import { validatePassword } from '../../utils/hash-password';
import { TTutorCreate } from './schemas/tutor-create-schema';
import { TTutor } from './schemas/tutor-schema';
import { TTutorUpdate } from './schemas/tutor-update-schema';

export class TutorService implements IService {
  constructor(private prisma: PrismaClient, private fastify: FastifyInstance) {
    this.prisma = prisma;
    this.fastify = fastify;
  }

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

  async login(data: { email: string; senha: string }): Promise<any> {
    const email = data.email;
    const senha = data.senha;

    const user = await this.prisma.tutor.findUnique({ where: { email } });
    const senhaValida = await validatePassword(senha, user?.senha || '');

    if (!user || !senhaValida) throw new CustomError('Email ou senha incorreto', 400);

    const payload = this.fastify.jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      {
        expiresIn: '30m',
      }
    );

    return { accessToken: payload };
  }
}
