import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { RolesEnum } from '../enum/roles.enum';
import { TPayload } from '../types/payload.type';
import { CustomError } from '../shared/custom-error';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  });

  fastify.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
    await req.jwtVerify();
  });

  fastify.decorate('authRole', (role: RolesEnum) => {
    return async (req: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(req, reply);

      const user = req.user as TPayload;

      if (user.role !== role) throw new CustomError(`Acesso exclusivo apenas para ${role}`, 401);
    };
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authRole: (role: RolesEnum) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
