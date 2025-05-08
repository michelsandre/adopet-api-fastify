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
import { RolesEnum } from '../../enum/roles.enum';
import { PetPaginationSchema } from './schemas/pet-pagination-schema';

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
        querystring: z.object({
          page: z
            .string()
            .optional()
            .describe('Quando informado, será apresentado 5 resultados por página'),
        }),
        tags: routeTag,
        response: {
          200: z.union([PetSchema.array(), PetPaginationSchema]),
        },
      },
    },
    async (req: FastifyRequest<{ Querystring: { page?: string } }>, reply) => {
      await petController.getAll(req, reply);
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
        description: 'Apenas os abrigos podem cadastrar um pet',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: PetCreateSchema,
        response: {
          201: PetSchema,
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
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
        description: 'Apenas os abrigos podem cadastrar um pet',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: ParamIdSchema,
        body: PetUpdateSchema,
        response: {
          200: PetSchema,
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
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
        description: 'Apenas os abrigos podem executar esta função',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          petId: ParamIdSchema.shape.id,
          abrigoId: ParamIdSchema.shape.id,
        }),

        response: {
          200: PetSchema,
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
    },
    async (req: FastifyRequest<{ Params: { petId: string; abrigoId: string } }>, reply) => {
      await petController.createRelation(req, reply);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        summary: 'Apagar registro',
        description: 'Apenas os abrigos podem executar esta função',
        tags: routeTag,
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: ParamIdSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [fastify.authRole(RolesEnum.ABRIGO)],
    },
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await petController.delete(req, reply);
    }
  );
};

export default pets;
