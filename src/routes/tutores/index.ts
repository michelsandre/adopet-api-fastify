import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { TutorSchema } from './schemas/tutor-schema';
import { TutorCreateSchema } from './schemas/tutor-create-schema';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { PrismaClient } from '../../../generated/prisma';
import { FastifyRequest } from 'fastify';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { TutorUpdateSchema } from './schemas/tutor-update-schema';
import { z } from 'zod';

const prismaService = new PrismaClient();
const tutorService = new TutorService(prismaService);
const tutorController = new TutorController(tutorService);

const routeTag = ['Tutores'];

const tutores: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Pesquisar todos',
        tags: routeTag,
        response: {
          200: TutorSchema.omit({ senha: true }).array(),
        },
      },
    },
    async (req, reply) => {
      await tutorController.getAll(req, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        summary: 'Pesquisar por id',
        tags: routeTag,
        params: ParamIdSchema,
        response: {
          200: TutorSchema.omit({ senha: true }),
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await tutorController.getById(req, reply);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        summary: 'Criar registro',
        tags: routeTag,
        body: TutorCreateSchema,
        response: {
          201: TutorSchema,
        },
      },
    },
    async (req, reply) => await tutorController.create(req, reply)
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        summary: 'Editar registro',
        tags: routeTag,
        params: ParamIdSchema,
        body: TutorUpdateSchema,
        response: {
          200: TutorSchema.omit({ senha: true }),
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await tutorController.update(req, reply);
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
      await tutorController.delete(req, reply);
    }
  );
};

export default tutores;
