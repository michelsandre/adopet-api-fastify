import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { FastifyRequest } from 'fastify';
import { ParamIdSchema } from '../../shared/param-id-schema';
import { z } from 'zod';
import { AdocaoSchema } from './schemas/adocao-schema';
import { AdocaoCreateSchema } from './schemas/adocao-create-schema';
import { AdocaoUpdateSchema } from './schemas/adocao-update-schema';

const routeTag = ['Adoção'];

const adocao: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Pesquisar todos',
        tags: routeTag,
        response: {
          200: AdocaoSchema.array(),
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
          200: AdocaoSchema,
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
        body: AdocaoCreateSchema,
        response: {
          201: AdocaoSchema,
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
        body: AdocaoUpdateSchema,
        response: {
          200: AdocaoSchema,
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

export default adocao;
