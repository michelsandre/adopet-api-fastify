import { FastifyReply, FastifyRequest } from 'fastify';

export abstract class IController {
  abstract getAll(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  abstract getById(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  abstract create(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  abstract update(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  abstract delete(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}
