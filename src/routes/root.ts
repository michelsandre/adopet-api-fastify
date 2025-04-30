import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        hide: true,
      },
    },
    async function (request, reply) {
      reply.redirect('/api');
    }
  );
};

export default root;
