import { FastifyInstance } from 'fastify';
import { PrismaClient } from '../../../generated/prisma';
import { TLogin } from '../../shared/login-schema';
import { validatePassword } from '../../utils/hash-password';
import { CustomError } from '../../shared/custom-error';
import { RolesEnum } from '../../enum/roles.enum';

export class LoginService {
  constructor(private prisma: PrismaClient, private fastify: FastifyInstance) {}

  async login(data: TLogin, admin: boolean = false): Promise<{ accessToken: string }> {
    const { email, senha } = data;

    const user = await this.prisma.tutor.findUnique({ where: { email } });
    const senhaValida = await validatePassword(senha, user?.senha || '');

    if (!user || !senhaValida) throw new CustomError('Email ou senha incorreto', 401);

    const payload = this.fastify.jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: admin ? RolesEnum.ABRIGO : RolesEnum.TUTOR,
      },
      {
        expiresIn: '10m',
      }
    );

    return { accessToken: payload };
  }
}
