import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';
import { TAbrigoCreate } from './schemas/abrigo-create-schema';
import { TAbrigoUpdate } from './schemas/abrigo-update-schema';

export class AbrigoController implements IController {
  constructor(private readonly service: IService) {
    this.service = service;
  }

  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const abrigos = await this.service.getAll();
    reply.status(200).send(abrigos);
  }
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;
    try {
      const abrigo = await this.service.getById(+id);
      reply.status(200).send(abrigo);
    } catch (error) {
      if (error instanceof Error) reply.notFound(error.message);
    }
  }
  async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = req.body as TAbrigoCreate;
    reply.status(201).send(await this.service.create(data));
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;
    const data = req.body as TAbrigoUpdate;
    try {
      reply.status(200).send(await this.service.update(+id, data));
    } catch (error) {
      if (error instanceof Error) reply.notFound(error.message);
    }
  }
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    try {
      reply.status(200).send(await this.service.delete(+id));
    } catch (error) {
      if (error instanceof Error) reply.notFound(error.message);
    }
  }
}
