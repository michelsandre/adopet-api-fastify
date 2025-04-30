import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';
import { ITutorCreate } from './schemas/tutor-create-schema';

export class TutorController implements IController {
  constructor(private readonly service: IService) {
    this.service = service;
  }

  getAll(req: FastifyRequest, reply: FastifyReply): void {
    reply.send(this.service.getAll());
  }
  getById(req: FastifyRequest, reply: FastifyReply): void {
    throw new Error('Method not implemented.');
  }
  create(req: FastifyRequest, reply: FastifyReply): void {
    const data = req.body as ITutorCreate;
    reply.status(201).send(this.service.create(data));
  }
  update(req: FastifyRequest, reply: FastifyReply): void {
    throw new Error('Method not implemented.');
  }
  delete(req: FastifyRequest, reply: FastifyReply): void {
    throw new Error('Method not implemented.');
  }
}
