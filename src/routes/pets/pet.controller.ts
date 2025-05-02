import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';
import { TPetCreate } from './schemas/pet-create-schema';

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
  async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = req.body as TPetCreate;
    reply.status(201).send(await this.service.create(data));
  }
  update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
