import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';
import { TPetCreate } from './schemas/pet-create-schema';
import { TPetUpdate } from './schemas/pet-update-schema';
import { IRelation } from '../../interfaces/relation.inteface';

export class PetController implements IController {
  constructor(private service: IService & IRelation) {
    this.service = service;
  }

  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.status(200).send(await this.service.getAll());
  }
  async getAllData(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.status(200).send(await this.service.getAll(true));
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    reply.status(200).send(await this.service.getById(+id));
  }

  async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = req.body as TPetCreate;
    reply.status(201).send(await this.service.create(data));
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;
    const data = req.body as TPetUpdate;

    reply.status(200).send(await this.service.update(+id, data));
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    reply.status(200).send(await this.service.delete(+id));
  }

  async createRelation(
    req: FastifyRequest<{ Params: { petId: string; abrigoId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const petId = req.params.petId;
    const abrigoId = req.params.abrigoId;

    reply
      .status(200)
      .send(await this.service.createRelation(+petId, +abrigoId));
  }
}
