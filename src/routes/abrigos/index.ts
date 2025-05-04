import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { AbrigoSchema } from './schemas/abrigo-schema';
import { AbrigoCreateSchema } from './schemas/abrigo-create-schema';
import { z } from 'zod';
import { AbrigoUpdateSchema } from './schemas/abrigo-update-schema';
import { AbrigoService } from './abrigo.service';
import { PrismaClient } from '../../../generated/prisma';
import { AbrigoController } from './abrigo.controller';

const prismaService = new PrismaClient();
const abrigoService = new AbrigoService(prismaService);
const abrigoController = new AbrigoController(abrigoService);

const routeTag = ['Abrigos'];

const abrigos: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Listar todos',
        tags: routeTag,
        response: {
          200: AbrigoSchema.omit({ pets: true }).array(),
        },
      },
    },
    async (req, reply) => {
      await abrigoController.getAll(req, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        summary: 'Pesquisar por id',
        description: 'Apresenta o abrigo e os pets sob seus cuidados',
        tags: routeTag,
        params: ParamIdSchema,
        response: {
          200: AbrigoSchema,
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await abrigoController.getById(req, reply);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        summary: 'Criar registro',
        tags: routeTag,
        body: AbrigoCreateSchema,
        response: {
          201: AbrigoSchema.omit({ pets: true }),
        },
      },
    },
    async (req, reply) => {
      await abrigoController.create(req, reply);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        summary: 'Editar registro',
        tags: routeTag,
        params: ParamIdSchema,
        body: AbrigoUpdateSchema,
        response: {
          200: AbrigoSchema.omit({ pets: true }),
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await abrigoController.update(req, reply);
    }
  );
  fastify.delete(
    '/:id',
    {
      schema: {
        tags: routeTag,
        summary: 'Apagar registro',
        params: ParamIdSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await abrigoController.delete(req, reply);
    }
  );
};

export default abrigos;
