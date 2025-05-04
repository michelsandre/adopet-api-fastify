import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { z } from 'zod';
import { PetSchema } from './schemas/pet-schema';
import { PetCreateSchema } from './schemas/pet-create-schema';
import { PetUpdateSchema } from './schemas/pet-update-schema';
import { PrismaClient } from '../../../generated/prisma';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';

const prismaService = new PrismaClient();
const petService = new PetService(prismaService);
const petController = new PetController(petService);

const routeTag = ['Pets'];

const pets: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Pesquisar todos os pets disponíveis',
        description:
          'Pesquisa de pets não adotados e cadastrados em algum abrigo',
        tags: routeTag,
        response: {
          200: PetSchema.array(),
        },
      },
    },
    async (req, reply) => {
      await petController.getAll(req, reply);
    }
  );
  fastify.get(
    '/todos',
    {
      schema: {
        summary: 'Pesquisar os registros de pets',
        description: 'Pesquisa de todos os pets',
        tags: routeTag,
        response: {
          200: PetSchema.array(),
        },
      },
    },
    async (req, reply) => {
      await petController.getAllData(req, reply);
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
          200: PetSchema,
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await petController.getById(req, reply);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        summary: 'Criar registro',
        tags: routeTag,
        body: PetCreateSchema,
        response: {
          201: PetSchema,
        },
      },
    },
    async (req, reply) => {
      await petController.create(req, reply);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        summary: 'Editar registro',
        tags: routeTag,
        params: ParamIdSchema,
        body: PetUpdateSchema,
        response: {
          200: PetSchema,
        },
      },
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await petController.update(req, reply);
    }
  );
  fastify.patch(
    '/:petId/:abrigoId',
    {
      schema: {
        summary: 'Atribuir um pet a um abrigo',
        tags: routeTag,
        params: z.object({
          petId: ParamIdSchema.shape.id,
          abrigoId: ParamIdSchema.shape.id,
        }),
        response: {
          200: PetSchema,
        },
      },
    },
    async (
      req: FastifyRequest<{ Params: { petId: string; abrigoId: string } }>,
      reply
    ) => {
      await petController.createRelation(req, reply);
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
      await petController.delete(req, reply);
    }
  );
};

export default pets;
