import { TutorService } from './tutor-service';
import { TutorController } from './tutor-controller';
import { TutorSchema } from './schemas/tutor-schema';
import { TutorCreateSchema } from './schemas/tutor-create-schema';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { PrismaClient } from '../../../generated/prisma';
import { FastifyRequest } from 'fastify';
import { z } from 'zod';

const prismaService = new PrismaClient();
const tutorService = new TutorService(prismaService);
const tutorController = new TutorController(tutorService);

const tutores: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: TutorSchema.omit({ senha: true }).array(),
        },
      },
    },
    (req, reply) => {
      tutorController.getAll(req, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string().regex(/^\d+$/), //Apenas numeros,
        }),
        response: {
          200: TutorSchema.omit({ senha: true }),
        },
      },
    },
    (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      tutorController.getById(req, reply);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: TutorCreateSchema,
        response: {
          201: TutorSchema,
        },
      },
    },
    (req, reply) => tutorController.create(req, reply)
  );
};

export default tutores;
