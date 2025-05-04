import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export class ErrorController {
  static verificaError(
    req: FastifyRequest,
    reply: FastifyReply,
    error: FastifyError
  ) {
    return reply.status(error.statusCode || 500).send(error.message);
  }
}
