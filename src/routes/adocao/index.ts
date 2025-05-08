import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { PrismaClient } from '../../../generated/prisma';
import { AdocaoService } from './adocao.service';
import { AdocaoController } from './adocao.controller';
import { AdocaoSchema } from './schemas/adocao-schema';

import { z } from 'zod';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { RolesEnum } from '../../enum/roles.enum';

const prismaService = new PrismaClient();
const adocaoService = new AdocaoService(prismaService);
const adocaoController = new AdocaoController(adocaoService);

const routeTag = ['Adoção'];

const adocao: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Listar todos registros',
        tags: routeTag,
        response: {
          200: AdocaoSchema.omit({ pet: true }).array(),
        },
      },
    },
    async (req, reply) => await adocaoController.getAll(req, reply)
  );

  fastify.post(
    '/:tutorId/:petId',
    {
      schema: {
        summary: 'Criar registro de adoçao',
        description:
          'Ao finalizar o registro, o pet informado mudará o status `adotado: true`. O pet pode conter apenas 1 registro de adoção. Apenas os abrigos podem executar esta função',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          tutorId: ParamIdSchema.shape.id,
          petId: ParamIdSchema.shape.id,
        }),
        response: {
          201: AdocaoSchema.omit({ pet: true }),
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
    },
    async (req: FastifyRequest<{ Params: { tutorId: string; petId: string } }>, reply) => {
      await adocaoController.createAdocao(req, reply);
    }
  );
  fastify.delete(
    '/:id',
    {
      schema: {
        summary: 'Apagar registro de adoção',
        description:
          'Apenas os abrigos podem cancelar uma adoção. O status do pet retornará para `adotado: false`. ',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) =>
      await adocaoController.delete(req, reply)
  );
};

export default adocao;
