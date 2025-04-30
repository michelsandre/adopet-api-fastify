import { FastifyPluginAsync } from 'fastify';

import { z } from 'zod';
import { TutorService } from './tutor-service';
import { TutorController } from './tutor-controller';
import { tutorSchema } from './schemas/tutor-schema';
import { tutorCreateSchema } from './schemas/tutor-create-schema';

const tutorService = new TutorService();
const tutorController = new TutorController(tutorService);

const tutores: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { schema: { response: { 200: z.array(tutorSchema) } } }, (req, reply) => {
    tutorController.getAll(req, reply);
  });

  fastify.post(
    '/',
    {
      schema: {
        body: tutorCreateSchema,
        response: {
          201: tutorSchema,
        },
      },
    },
    (req, reply) => tutorController.create(req, reply)
  );
};

export default tutores;
