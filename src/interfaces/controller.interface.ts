import { FastifyReply, FastifyRequest } from 'fastify';

export abstract class IController {
  abstract getAll(req: FastifyRequest, reply: FastifyReply): Promise<void>;

  abstract getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void>;

  abstract create(req: FastifyRequest, reply: FastifyReply): Promise<void>;

  abstract update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void>;

  abstract delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void>;
}
