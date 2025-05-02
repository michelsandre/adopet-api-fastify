import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';

export class PetController implements IController {
  constructor(private service: IService) {
    this.service = service;
  }
  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.status(200).send(await this.service.getAll());
  }
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;
    try {
      reply.status(200).send(await this.service.getById(+id));
    } catch (error) {
      if (error instanceof Error) reply.notFound(error.message);
    }
  }
  create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
