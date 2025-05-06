import { FastifyReply, FastifyRequest } from 'fastify';
import { AdocaoService } from './adocao.service';

export class AdocaoController {
  constructor(private service: AdocaoService) {}

  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.status(200).send(await this.service.getAll());
  }

  async createAdocao(
    req: FastifyRequest<{ Params: { tutorId: string; petId: string } }>,
    reply: FastifyReply
  ) {
    const tutorId = req.params.tutorId;
    const petId = req.params.petId;

    reply.status(201).send(await this.service.createAdocao(+tutorId, +petId));
  }
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    reply.status(200).send(await this.service.delete(id));
  }
}
