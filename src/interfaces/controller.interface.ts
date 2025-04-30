import { FastifyReply, FastifyRequest } from 'fastify';

export abstract class IController {
  abstract getAll(req: FastifyRequest, reply: FastifyReply): void;
  abstract getById(req: FastifyRequest, reply: FastifyReply): void;
  abstract create(req: FastifyRequest, reply: FastifyReply): void;
  abstract update(req: FastifyRequest, reply: FastifyReply): void;
  abstract delete(req: FastifyRequest, reply: FastifyReply): void;
}
