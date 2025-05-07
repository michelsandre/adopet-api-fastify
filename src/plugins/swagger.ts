import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fp(async (fastify) => {
  // Fastify Swagger
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Adopet API',
        description: 'Desafio Alura Challenge Backend 6 ed - Adopet',
        version: '1.0.0',
        contact: {
          name: 'André Michels',
          url: 'https://github.com/michelsandre',
        },
      },
      servers: [],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
    // transformObject: createJsonSchemaTransformObject({
    //   schemas: {
    //     TutorSchema: TutorSchema.omit({ senha: true }),
    //     TutorCreateSchema: TutorCreateSchema,
    //     TutorUpdateSchema: TutorUpdateSchema,
    //   },
    // }),
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/api',
    theme: {
      title: 'Adopet API',
    },
  });
});
