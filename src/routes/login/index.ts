import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { LoginSchema, TLogin } from '../../shared/login-schema';

import { z } from 'zod';
import { PrismaClient } from '../../../generated/prisma';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

const routeTag = ['Login'];

const login: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  const prismaService = new PrismaClient();
  const loginService = new LoginService(prismaService, fastify);
  const loginController = new LoginController(loginService);

  fastify.post(
    '/tutor',
    {
      schema: {
        summary: 'Realizar autenticação de tutor',
        body: LoginSchema,
        response: {
          200: z.object({
            accessToken: z.string(),
          }),
        },
        tags: routeTag,
      },
    },
    async (req: FastifyRequest<{ Body: TLogin }>, reply) => {
      await loginController.loginUser(req, reply);
    }
  );
  fastify.post(
    '/abrigo',
    {
      schema: {
        summary: 'Realizar autenticação de abrigo',
        body: LoginSchema,
        response: {
          200: z.object({
            accessToken: z.string(),
          }),
        },
        tags: routeTag,
      },
    },
    async (req: FastifyRequest<{ Body: TLogin }>, reply) => {
      await loginController.loginAdmin(req, reply);
    }
  );
};

export default login;
