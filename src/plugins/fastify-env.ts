import fastifyEnv from '@fastify/env';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  const schema = {
    type: 'object',
    required: ['JWT_SECRET', 'EXPIRES_IN'],
    properties: {
      JWT_SECRET: {
        type: 'string',
        default: 'super-secreto',
      },
      EXPIRES_IN: {
        type: 'string',
        default: '10m',
      },
    },
  };

  await fastify.register(fastifyEnv, {
    schema,
    dotenv: true,
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
      EXPIRES_IN: string;
    };
  }
}
