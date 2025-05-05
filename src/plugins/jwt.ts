import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: 'super-secreto',
  });

  fastify.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      await req.jwtVerify();
    }
  );
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<any>;
  }
}
