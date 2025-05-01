import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { z } from 'zod';
import { PetSchema } from './schemas/pet-schema';
import { PetCreateSchema } from './schemas/pet-create-schema';
import { PetUpdateSchema } from './schemas/pet-update-schema';

const routeTag = ['Pets'];

const pets: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Pesquisar todos',
        tags: routeTag,
        response: {
          200: PetSchema.array(),
        },
      },
    },
    (req, reply) => {}
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
    (req: FastifyRequest<{ Params: { id: string } }>, reply) => {}
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
    (req, reply) => {}
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
    (req: FastifyRequest<{ Params: { id: string } }>, res) => {}
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
    (req: FastifyRequest<{ Params: { id: string } }>, res) => {}
  );
};

export default pets;
