import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';

import { TPetCreate } from './schemas/pet-create-schema';
import { TPetUpdate } from './schemas/pet-update-schema';
import { IRelation } from '../../interfaces/relation.inteface';
import { PetService } from './pet.service';

export class PetController implements IController {
  constructor(private service: PetService & IRelation) {}

  async getAll(
    req: FastifyRequest<{ Querystring: { page?: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const page = req.query.page;

    reply.status(200).send(await this.service.getAll(page ? +page : undefined));
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

    reply.status(200).send(await this.service.createRelation(+petId, +abrigoId));
  }
}
